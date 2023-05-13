import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import ApiInput from './ApiInput/ApiInput';
import Docs from './Docs/Docs';
import Variables from './Variables/Variables';
import Headers from './Headers/Headers';
import { useAppSelector } from '../../store/hooks';
import { selectDocs } from '../../store/slices/docs';
import Schema from './Docs/components/Schema/Schema';

const GraphiqlPage = (): JSX.Element => {
  const { isDocs } = useAppSelector(selectDocs);
  return (
    <div className={styles.container}>
      <ApiInput />
      <div className={styles['main-block']}>
        <Editor />
        <Docs />
        {isDocs && <Schema />}
      </div>
      <aside className={`${styles['aside-section']}`}>
        <Variables />
        <Headers />
      </aside>
    </div>
  );
};

export default GraphiqlPage;
