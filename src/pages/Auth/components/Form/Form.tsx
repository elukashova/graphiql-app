import styles from './Form.module.css';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '../../Auth.types';
import { useAppSelector } from '../../../../store/hooks';
import { selectRoute } from '../../../../store/slices/route';
import { signIn, signUp } from '../../../../auth/auth';

const AuthForm = (): JSX.Element => {
  const { handleSubmit, register } = useForm<UserData>();
  const { isSignUp } = useAppSelector(selectRoute);

  const onSubmit: SubmitHandler<UserData> = async ({ email, password }: UserData) => {
    console.log(email, password);
    const authorizeUser = isSignUp ? signUp : signIn;

    try {
      const response = await authorizeUser(email, password);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
    </form>
  );
};

export default AuthForm;
