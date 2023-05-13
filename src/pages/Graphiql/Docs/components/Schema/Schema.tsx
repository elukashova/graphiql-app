import React from 'react';
import styles from './Schema.module.css';

const Schema = () => {
  return (
    <h3 className={styles.modal}>DOCS</h3>
    // <iframe
    //   className={styles.modal}
    //   src="../../../../doc/schema/index.html"
    //   title="GraphQL documentation"
    // ></iframe>
  );
};

export default Schema;
