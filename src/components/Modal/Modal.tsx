import React from 'react';
import styles from './Modal.module.css';

interface Props {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ message, onClose }) => {
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
