import React, { useState } from 'react';
import styles from './Header.module.css';
import ButtonLang from './components/ButtonLang/ButtonLang';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/auth';
import { logOut } from '../../auth/auth';
import useAuth from '../../hooks/authHook';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import { useTranslation } from 'react-i18next';

const Header = (): JSX.Element => {
  const [scroll, setScroll] = useState(false);
  const { isAuth } = useAppSelector(selectAuth);
  const { toggleSignUp, toggleSignIn } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const scrollHeader = () => {
    if (window.scrollY >= 50) setScroll(true);
    else setScroll(false);
  };

  window.addEventListener('scroll', scrollHeader);

  const handleLogOut = async (): Promise<void> => {
    const response = await logOut();
    console.log(response);
  };

  return (
    <header className={!scroll ? styles.header : `${styles.header} ${styles.fixed}`}>
      <div className={styles.wrapper}>
        <NavLink to="/">
          <div className={styles['logo-block']}>
            <span className={`${styles.circle} ${styles['first-circle']}`}></span>
            <img className={styles.logo} src={logo} alt="logo" />
            <span className={`${styles.circle} ${styles['second-circle']}`}></span>
          </div>
        </NavLink>
        <nav className={styles.nav}>
          {!isAuth && (
            <>
              <NavLink to="/signup" onClick={toggleSignUp} className={styles.link}>
                {t('sign_up')}
              </NavLink>
              <NavLink to="/signin" onClick={toggleSignIn} className={styles.link}>
                {t('sign_in')}
              </NavLink>
            </>
          )}
          {isAuth && location.pathname !== '/editor' && (
            <NavLink to="/editor" className={styles.link}>
              {t('header.go_to_main')}
            </NavLink>
          )}
          {isAuth && (
            <NavLink to="/" end onClick={handleLogOut} className={styles.link}>
              {t('header.log_out')}
            </NavLink>
          )}
          <ButtonLang />
        </nav>
      </div>
    </header>
  );
};

export default Header;
