import React from 'react';
import styles from './Loader.module.css';
import loadingGif from '../../assets/loading.gif';

const Loader: React.FC = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingGif} alt="loading" />
    </div>
  );
};

export default Loader;
