import React from 'react';
import styles from './ButtonLang.module.css';

const ButtonLang = (): JSX.Element => {
  return (
    <div className={styles['checkbox-wrapper']}>
      <label className={styles.switch} htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
    </div>
  );
};

export default ButtonLang;
