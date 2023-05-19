import React from 'react';
import styles from './NotFound.module.css';
import notFound from '../../assets/404.png';

const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <img className={styles.background} src={notFound} alt="" />
      <p className={styles.text}>
        Page not found.
        <br />
        Go to
        <a href="/" className={styles.highlight}>
          editor?
        </a>
      </p>
    </div>
  );
};

export default NotFound;
