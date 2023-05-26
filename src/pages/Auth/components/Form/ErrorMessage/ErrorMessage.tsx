import styles from './ErrorMessage.module.css';
import React from 'react';

type Props = {
  message?: string;
};

const ErrorMessage = ({ message }: Props): JSX.Element => {
  return (
    <>
      <div className={styles.error}>{message}</div>
    </>
  );
};

export default ErrorMessage;
