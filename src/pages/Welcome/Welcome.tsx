import React from 'react';
import InfoCard from './Infocard/Infocard';
import styles from './Welcome.module.css';
import url1 from '../../assets/nastya.jpg';
import url2 from '../../assets/elena.jpg';
import url3 from '../../assets/karina.jpg';

const WelcomePage = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h2 className={styles.title}>Welcome to</h2>
          <h2 className={styles.name}>GraphiQL</h2>
        </div>
        <div className={styles.bottom}>
          <InfoCard
            title="What?"
            text="GraphiQL is a tool designed for developers to test and explore GraphQL APIs: it provides an interactive platform enabling the execution and composition of GraphQL queries, examination of response data, and navigation of API documentation."
          />
          <InfoCard
            title="Who?"
            urls={[url1, url2, url3]}
            names={['Anastasia Klimova', 'Elena Lukashova', 'Karina Timoshina']}
          />
          <InfoCard
            title="Why?"
            text="GraphiQL clone is the final task of the RSSchool React course, the so-called 'Stage 3' in the learning path provided by the school for those willing to become front-end developers."
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
