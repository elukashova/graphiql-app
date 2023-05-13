import styles from './Form.module.css';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '../../Auth.types';
import { useAppSelector } from '../../../../store/hooks';
import { selectRoute } from '../../../../store/slices/route';
import { signIn, signUp } from '../../../../auth/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Graphiql/Editor/Editor';
import { setIsLoading } from '../../../../store/slices/auth';
import { AuthError, User } from 'firebase/auth';
import { defineErrorMessage } from './ErrorMessage/ErrorMessage.utils';
import { FirebaseErrors, ValidationErrors } from './ErrorMessage/ErrorMessage.types';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import {
  PASSWORD_DIGIT,
  PASSWORD_LETTERS,
  PASSWORD_SPECIAL_CHAR,
  VALID_EMAIL,
} from './Form.consts';

const AuthForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserData>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { isSignUp } = useAppSelector(selectRoute);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit: SubmitHandler<UserData> = ({ email, password }: UserData) => {
    const authorizeUser = isSignUp ? signUp : signIn;

    dispatch(setIsLoading(true));
    authorizeUser(email, password)
      .then((userCredential) => {
        const user: User | undefined = userCredential.result?.user;
        if (user) {
          navigate('/editor');
        }

        const authError: AuthError | null = userCredential.error;
        if (authError) {
          const errorCode: string = authError.code;
          const message: string = defineErrorMessage(errorCode);
          setError(message);
          setTimeout(() => setError(undefined), 1500);
        }
      })
      .catch(() => {
        setError(FirebaseErrors.genericMessage);
        setTimeout(() => setError(undefined), 1500);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            {...register('email', {
              required: ValidationErrors.emptyEmail,
              pattern: {
                value: VALID_EMAIL,
                message: ValidationErrors.email,
              },
            })}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            {...register('password', {
              required: ValidationErrors.emptyPassword,
              validate: {
                minLength: (value) => value.length >= 8 || ValidationErrors.passwordLength,
                oneLetter: (value) =>
                  PASSWORD_LETTERS.test(value) || ValidationErrors.passwordLetters,
                oneDigit: (value) => PASSWORD_DIGIT.test(value) || ValidationErrors.passwordDigit,
                oneSpecialChar: (value) =>
                  PASSWORD_SPECIAL_CHAR.test(value) || ValidationErrors.passwordSpecialChar,
              },
            })}
          />
        </label>
      </div>

      <div>
        <input
          className={styles.submit}
          type="submit"
          value="submit"
          data-testid="submit"
          data-cy="submit"
        />
      </div>
      {errors.email?.types && <ErrorMessage message={errors.email.message} />}
      {errors.password?.types && <ErrorMessage message={errors.password.message} />}
      {error && <ErrorMessage message={error} />}
    </form>
  );
};

export default AuthForm;
