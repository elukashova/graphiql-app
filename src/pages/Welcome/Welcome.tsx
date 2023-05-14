import React from 'react';
import styles from '../Layout.module.css';

const WelcomePage = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <div>
        The welcome page should contain general information about the developers, project, and
        course.
      </div>
    </section>
  );
};

export default WelcomePage;
