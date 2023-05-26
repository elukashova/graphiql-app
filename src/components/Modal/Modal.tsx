import React from 'react';
import styles from './Modal.module.css';

interface Props {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ type, message, onClose }): JSX.Element => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
