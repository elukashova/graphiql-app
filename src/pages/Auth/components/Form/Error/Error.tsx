import styles from './Error.module.css';
import React from 'react';

type Props = {
  message?: string;
};

const ErrorMessage = ({ message }: Props): JSX.Element => {
  return (
    <>
      <div data-testid="error" className={styles['error-wrapper']}>
        <p className={styles.exclamation}>!!!</p>
        <p className={styles.error}>{message}</p>
      </div>
    </>
  );
};

export default ErrorMessage;
