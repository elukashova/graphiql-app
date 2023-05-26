import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import Docs from './Docs/Docs';
import { Navigate } from 'react-router-dom';

type Props = {
  auth: boolean;
};

const GraphiqlPage = ({ auth }: Props): JSX.Element => {
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['main-block']}>
        <Editor />
        <Docs />
      </div>
    </div>
  );
};

export default GraphiqlPage;
