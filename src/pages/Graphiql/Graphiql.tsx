import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import Docs from './Docs/Docs';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/slices/auth';

const GraphiqlPage = (): JSX.Element => {
  const { isAuth } = useAppSelector(selectAuth);
  if (!isAuth) {
    return <Navigate to="/" />;
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
