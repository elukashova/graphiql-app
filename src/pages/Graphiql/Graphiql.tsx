import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import ApiInput from './ApiInput/ApiInput';
import Docs from './Docs/Docs';
import Variables from './Variables/Variables';

const GraphiqlPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <ApiInput />
      <div className={styles['main-block']}>
        <Editor />
        <Docs />
      </div>
      <aside className={`${styles['aside-section']}`}>
        <Variables />
        <section className={`${styles.panel}`}>
          <h2>Headers</h2>
        </section>
      </aside>
    </div>
  );
};

export default GraphiqlPage;
