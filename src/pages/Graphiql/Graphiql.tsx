import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import ApiInput from './ApiInput/ApiInput';
import Docs from './Docs/Docs';
import Variables from './Variables/Variables';
// import { useAppSelector } from '../../store/hooks';
// import { selectDocs } from '../../store/slices/docs';
// import Schema from './Docs/components/Schema/Schema';
import { Navigate } from 'react-router-dom';

type Props = {
  auth: boolean;
};

const GraphiqlPage = ({ auth }: Props): JSX.Element => {
  // const { isDocs } = useAppSelector(selectDocs);

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <ApiInput />
      <div className={styles['main-block']}>
        <Editor />
        <Docs />
        {/* {isDocs && <Schema />} */}
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
