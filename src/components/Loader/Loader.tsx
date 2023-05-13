import React from 'react';
import styles from './Loader.module.css';

const Loader = (): JSX.Element => {
  return (
    <div className={styles.loader}>
      <span className={styles.ball} />
      <span className={styles.ball} />
      <span className={styles.ball} />
      <span className={styles.ball} />
    </div>
  );
};

export default Loader;
