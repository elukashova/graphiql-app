import React from 'react';
import styles from './Schema.module.css';

const Schema = () => {
  return (
    <iframe
      className={styles.modal}
      src="../../../../doc/schema/index.html"
      title="GraphQL documentation"
    ></iframe>
  );
};

export default Schema;
