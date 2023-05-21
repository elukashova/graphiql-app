import React from 'react';
import styles from './Loading.module.css';
import loadingGif from '../../assets/loading.gif';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingGif} alt="loading" />
    </div>
  );
};

export default Loading;
