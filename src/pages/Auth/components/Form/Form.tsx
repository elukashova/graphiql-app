import styles from './Form.module.css';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '../../Auth.types';
import { useAppSelector } from '../../../../store/hooks';
import { selectRoute } from '../../../../store/slices/route';
import { signIn, signUp } from '../../../../auth/auth';
import { useAppDispatch } from '../../../Graphiql/Editor/Editor';
import { setIsLoading } from '../../../../store/slices/auth';
import { AuthError } from 'firebase/auth';
import { useErrorMessage } from '../../../../hooks/errorHook';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import {
  PASSWORD_DIGIT,
  PASSWORD_LETTERS,
  PASSWORD_SPECIAL_CHAR,
  VALID_EMAIL,
} from './Form.consts';
import { useTranslation } from 'react-i18next';

const AuthForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    unregister,
    trigger,
    formState: { errors },
  } = useForm<UserData>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { isSignUp } = useAppSelector(selectRoute);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const { t, i18n } = useTranslation();
  const { defineErrorMessage } = useErrorMessage();

  i18n.on('languageChanged', () => {
    triggerRegister('email');
    triggerRegister('password');
  });

  const triggerRegister = (name: 'email' | 'password'): void => {
    unregister(name);
    register(name);
    trigger();
  };

  const onSubmit: SubmitHandler<UserData> = async ({ email, password }: UserData) => {
    const authorizeUser = isSignUp ? signUp : signIn;
    try {
      const userCredential = await authorizeUser(email, password);
      dispatch(setIsLoading(true));
      const authError: AuthError | null = userCredential.error;
      if (authError) {
        const errorCode: string = authError.code;
        setError(defineErrorMessage(errorCode));
        setTimeout(() => setError(''), 1500);
      }
    } catch {
      setError(`${t('firebase.generic_message')}`);
      setTimeout(() => setError(''), 1500);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.wrapper}>
        <div className={styles['input-wrapper']}>
          <label className={styles.label}>{t('auth.email')}</label>
          <input
            className={styles.input}
            type="email"
            {...register('email', {
              required: `${t('validation.empty_email')}`,
              pattern: {
                value: VALID_EMAIL,
                message: `${t('validation.email')}`,
              },
            })}
          />
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles.label}>{t('auth.password')}</label>
          <input
            className={styles.input}
            type="password"
            {...register('password', {
              required: `${t('validation.empty_password')}`,
              validate: {
                minLength: (value) => value.length >= 8 || `${t('validation.password_length')}`,
                oneLetter: (value) =>
                  PASSWORD_LETTERS.test(value) || `${t('validation.password_letters')}`,
                oneDigit: (value) =>
                  PASSWORD_DIGIT.test(value) || `${t('validation.password_digit')}`,
                oneSpecialChar: (value) =>
                  PASSWORD_SPECIAL_CHAR.test(value) || `${t('validation.password_special_char')}`,
              },
            })}
          />
        </div>
      </div>

      <input className={styles.submit} type="submit" value={`${t('auth.submit')}`} />

      {errors.email?.types && <ErrorMessage message={errors.email.message} />}
      {errors.password?.types && <ErrorMessage message={errors.password.message} />}
      {error && <ErrorMessage message={error} />}
    </form>
  );
};

export default AuthForm;
