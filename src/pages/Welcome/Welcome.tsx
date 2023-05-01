import React from 'react';
import styles from '../Layout.module.css';

const WelcomePage = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <a href="/auth">Auth</a>
      <a href="/editor">Editor</a>
    </section>
  );
};

export default WelcomePage;
