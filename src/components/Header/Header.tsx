import React from 'react';
import styles from './Header.module.css';
import Logo from './components/Logo/Logo';
import ButtonLink from './components/ButtonLink/ButtonLink';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.buttons}>
          {/* {token && (
              <ButtonLink to={'/}>
                Go to App
              </ButtonLink>
            )} */}
          {/* нужно будет поставить условие, кнопка входа в приложение будет появляться когда пользоватеь авторизован */}
          <ButtonLink to={'/auth'}>Auth</ButtonLink>
          <ButtonLink to={'/editor'}>Editor</ButtonLink>
          <button type="button" className={styles.button}>
            Lang
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
