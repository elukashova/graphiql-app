import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import ApiInput from './ApiInput/ApiInput';
import Docs from './Docs/Docs';
import { useAppSelector } from '../../store/hooks';
import { selectDocs } from '../../store/slices/docs';
import ModalWindow from './Docs/components/modalWindow/modalWindow';

const GraphiqlPage = (): JSX.Element => {
  const { isDocs } = useAppSelector(selectDocs);
  return (
    <div className={styles.container}>
      <ApiInput />
      <div className={styles.wrapper}>
        <div className={styles['editor-wrapper']}>
          <Editor />
          <Docs />
          {isDocs && <ModalWindow />}
        </div>
      </div>
      <aside>
        <section className={`${styles.panel}`}>
          <h2>Variables</h2>
        </section>
        <section className={`${styles.panel}`}>
          <h2>Headers</h2>
        </section>
      </aside>
    </div>
  );
};

export default GraphiqlPage;
