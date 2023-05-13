import React, { MouseEventHandler } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectRoute } from '../../store/slices/route';
import styles from './Auth.module.css';
import AuthForm from './components/Form/Form';
import useAuth from '../../hooks/authHook';
import AuthLink from './components/Link/Link';
import { selectAuth } from '../../store/slices/auth';
import Loader from '../../components/Loader/Loader';

const AuthPage = (): JSX.Element => {
  const { isSignIn, isSignUp } = useAppSelector(selectRoute);
  const { isLoading } = useAppSelector(selectAuth);
  const { toggleSignUp, toggleSignIn } = useAuth();

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (isSignUp) {
      toggleSignIn();
    } else if (isSignIn) {
      toggleSignUp();
    }
  };

  return (
    <section className={styles.section}>
      {isSignUp && (
        <div className={styles['title-wrapper']}>
          <h2 className={styles.sign}>Sign</h2>
          <h2 className={styles.title}>up</h2>
        </div>
      )}
      {isSignIn && (
        <div className={styles['title-wrapper']}>
          <h2 className={styles.sign}>Sign</h2>
          <h2 className={styles.title}>in</h2>
        </div>
      )}
      <AuthForm />
      <div>
        {isSignUp && (
          <AuthLink text="Have an account?" label="Sign in" clickCallback={handleClick} />
        )}
        {isSignIn && (
          <AuthLink text="Not registered?" label="Sign up" clickCallback={handleClick} />
        )}
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default AuthPage;
