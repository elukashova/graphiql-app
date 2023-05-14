import styles from './Link.module.css';
import React, { MouseEventHandler } from 'react';

type Props = {
  text: string;
  label: string;
  clickCallback: MouseEventHandler;
};

const AuthLink = ({ text, label, clickCallback }: Props): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
      <a href="/auth" onClick={clickCallback} className={styles.link}>
        {label}
      </a>
    </div>
  );
};

export default AuthLink;
