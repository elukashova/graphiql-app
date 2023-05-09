import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectRoute } from '../../store/slices/routeSlice';
import styles from './Auth.module.css';
import AuthForm from './components/Form';
import useAuth from '../../hooks/authHook';

const AuthPage = (): JSX.Element => {
  const { isSignIn, isSignUp } = useAppSelector(selectRoute);
  const { toggleSignUp, toggleSignIn } = useAuth();

  return (
    <section className={styles.section}>
      {isSignUp && <h3>Sign up</h3>}
      {isSignIn && <h3>Sign in</h3>}
      <AuthForm />
      {isSignUp && (
        <>
          <p>Have an account?</p>
          <a href="/auth" onClick={toggleSignIn}>
            Sign in
          </a>
        </>
      )}
      {isSignIn && (
        <>
          <p>Not registered?</p>
          <a href="/auth" onClick={toggleSignUp}>
            Sign up
          </a>
        </>
      )}
    </section>
  );
};

export default AuthPage;
