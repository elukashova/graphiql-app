import styles from './Form.module.css';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserData } from '../../Auth.types';
import { useAppSelector } from '../../../../store/hooks';
import { selectRoute } from '../../../../store/slices/route';
import { signIn, signUp } from '../../../../auth/auth';
// import { selectAuth } from '../../../../store/slices/auth';
// import { useNavigate } from 'react-router-dom';

const AuthForm = (): JSX.Element => {
  const { handleSubmit, register } = useForm<UserData>();
  const { isSignUp } = useAppSelector(selectRoute);
  // const { isAuth } = useAppSelector(selectAuth);
  // const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserData> = async ({ email, password }: UserData) => {
    const authorizeUser = isSignUp ? signUp : signIn;

    try {
      await authorizeUser(email, password);
      // console.log(isAuth);
      // if (isAuth) {
      //   navigate('/editor');
      // }
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
