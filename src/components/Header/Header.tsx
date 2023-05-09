import React, { useState } from 'react';
import styles from './Header.module.css';
import Logo from './components/Logo/Logo';
import ButtonLink from './components/ButtonLink/ButtonLink';
import ButtonLang from './components/ButtonLang/ButtonLang';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/authSlice';
import { logOut } from '../../auth/auth';
import useAuth from '../../hooks/authHook';

const Header = (): JSX.Element => {
  const [scroll, setScroll] = useState(false);
  const { isAuth } = useAppSelector(selectAuth);
  const { toggleSignUp, toggleSignIn } = useAuth();

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
    <header className={!scroll ? styles.header : `${styles.header} ${styles.active}`}>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.buttons}>
          {!isAuth && (
            <>
              <ButtonLink to={'/auth'} clickCallback={toggleSignUp} label="Sign up" />
              <ButtonLink to={'/auth'} clickCallback={toggleSignIn} label="Sign in" />
            </>
          )}
          {/* {token && (
              <ButtonLink to={'/}>
                Go to App
              </ButtonLink>
            )} */}
          {/* нужно будет поставить условие, кнопка входа в приложение будет появляться когда пользоватеь авторизован */}
          <ButtonLink to={'/editor'} label="Editor" />
          {isAuth && <ButtonLink to={'/'} clickCallback={handleLogOut} label="Log out" />}
          <ButtonLang />
        </div>
      </div>
    </header>
  );
};

export default Header;
