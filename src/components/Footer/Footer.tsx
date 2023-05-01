import React from 'react';
import styles from './Footer.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>This is footer</div>
    </footer>
  );
};

export default Footer;
