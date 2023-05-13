import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import ApiInput from './ApiInput/ApiInput';
import Docs from './Docs/Docs';
import Variables from './Variables/Variables';
import Headers from './Headers/Headers';

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
        <Headers />
      </aside>
    </div>
  );
};

export default GraphiqlPage;
