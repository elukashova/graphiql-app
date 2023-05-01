import React from 'react';
import styles from './Header.module.css';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>This is header</h1>
      </div>
    </header>
  );
};

export default Header;
