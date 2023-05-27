import React from 'react';
import styles from './Footer.module.css';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.gitHub}>
          <a
            className={styles.link}
            href="https://github.com/elukashova"
            target="_blank"
            rel="noreferrer"
          >
            Elukashova
          </a>
          <a
            className={styles.link}
            href="https://github.com/TrickyPie"
            target="_blank"
            rel="noreferrer"
          >
            TrickyPie
          </a>
          <a
            className={styles.link}
            href="https://github.com/Karinaguseva"
            target="_blank"
            rel="noreferrer"
          >
            KarinaGuseva
          </a>
        </div>
        <div className={styles.year}>&copy; 2023</div>
        <a className={styles.rss} href="https://rs.school/react/" target="_blank" rel="noreferrer">
          rs school course js
        </a>
      </div>
    </footer>
  );
};

export default Footer;
