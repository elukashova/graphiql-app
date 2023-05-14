import React, { useState } from 'react';
import styles from './Header.module.css';
import ButtonLang from './components/ButtonLang/ButtonLang';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/auth';
import { logOut } from '../../auth/auth';
import useAuth from '../../hooks/authHook';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = (): JSX.Element => {
  const [scroll, setScroll] = useState(false);
  const { isAuth } = useAppSelector(selectAuth);
  const { toggleSignUp, toggleSignIn } = useAuth();
  const location = useLocation();

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
          <img className={styles.logo} src={logo} alt="logo" />
        </NavLink>
        <nav className={styles.nav}>
          {!isAuth && (
            <>
              <NavLink to="/auth" onClick={toggleSignUp} className={styles.link}>
                sign up
              </NavLink>
              <NavLink to="/auth" onClick={toggleSignIn} className={styles.link}>
                sign in
              </NavLink>
            </>
          )}
          {isAuth && location.pathname !== '/editor' && (
            <NavLink to="/editor" className={styles.link}>
              editor
            </NavLink>
          )}
          {isAuth && (
            <NavLink to="/" end onClick={handleLogOut} className={styles.link}>
              log out
            </NavLink>
          )}
          <ButtonLang />
        </nav>
      </div>
    </header>
  );
};

export default Header;
