import React from 'react';
import { signIn, signUp, logOut } from '../../auth/auth';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/authSlice';
import styles from '../Layout.module.css';

const WelcomePage = (): JSX.Element => {
  const { isAuth, userEmail } = useAppSelector(selectAuth);

  const testSignUp = async () => {
    const response = await signUp('email@test.com', 'password123');
    console.log(response);
  };

  const testSignIn = async () => {
    await signIn('email@test.com', 'password123');
    console.log(`You are signed in`);
  };

  const testLogOut = async () => {
    const response = await logOut();
    console.log(response);
  };

  return (
    <section className={styles.section}>
      <div>
        <a href="/auth">Auth</a>
        <a href="/editor">Editor</a>
      </div>

      <div>
        <button onClick={testSignUp}>Sign Up</button>
        {isAuth ? (
          <button onClick={testLogOut}>Log out</button>
        ) : (
          <button onClick={testSignIn}>Sign In</button>
        )}
        <div>{userEmail}</div>
      </div>
    </section>
  );
};

export default WelcomePage;
