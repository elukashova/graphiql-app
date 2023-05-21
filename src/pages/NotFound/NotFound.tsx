import React from 'react';
import styles from './NotFound.module.css';
import notFound from '../../assets/auth-background.png';

const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <img className={styles.background} src={notFound} alt="" />
      <h2 className={styles.text}>
        Page not found.
        <br />
        Go to
        <a href="/" className={styles.highlight}>
          editor?
        </a>
      </h2>
    </div>
  );
};

export default NotFound;
