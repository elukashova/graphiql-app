import React from 'react';
import styles from './Schema.module.css';

const Schema = () => {
  return (
    <div className={styles.modal}>
      <iframe
        className={styles.schema}
        src="../../../../doc/scпhema/index.html"
        title="GraphQL documentation"
      ></iframe>
    </div>
  );
};

export default Schema;
