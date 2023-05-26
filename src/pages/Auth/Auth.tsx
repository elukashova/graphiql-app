import React, { MouseEventHandler } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectRoute } from '../../store/slices/route';
import styles from './Auth.module.css';
import AuthForm from './components/Form/Form';
import useAuth from '../../hooks/authHook';
import AuthLink from './components/Link/Link';
import { selectAuth } from '../../store/slices/auth';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

const AuthPage = (): JSX.Element => {
  const { isSignIn, isSignUp } = useAppSelector(selectRoute);
  const { isLoading } = useAppSelector(selectAuth);
  const { toggleSignUp, toggleSignIn } = useAuth();
  const { t } = useTranslation();

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
      <div className={styles['title-wrapper']}>
        <h2 className={styles.sign}>{isSignUp ? t('auth.sign_up') : t('auth.sign_in')}</h2>
        <h2 className={styles.title}>{isSignUp ? t('auth.up') : t('auth.in')}</h2>
      </div>
      <AuthForm />
      {isSignUp && (
        <AuthLink
          text={`${t('auth.have_account')}?`}
          label={t('sign_in')}
          clickCallback={handleClick}
        />
      )}
      {isSignIn && (
        <AuthLink
          text={`${t('auth.no_account')}?`}
          label={t('sign_up')}
          clickCallback={handleClick}
        />
      )}
      {isLoading && <Loader />}
    </section>
  );
};

export default AuthPage;
