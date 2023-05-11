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
import { defineErrorMessage } from './Error/Error.utils';
import { ErrorMessages } from './Error/Error.types';
import ErrorMessage from './Error/Error';

const AuthForm = (): JSX.Element => {
  const { handleSubmit, register } = useForm<UserData>();
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
        setError(ErrorMessages.genericMessage);
        setTimeout(() => setError(undefined), 1500);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <label className={styles.label}>
          Email
          <input className={styles.input} type="email" {...register('email')} />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type="password" {...register('password')} />
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
      {error && <ErrorMessage message={error} />}
    </form>
  );
};

export default AuthForm;
