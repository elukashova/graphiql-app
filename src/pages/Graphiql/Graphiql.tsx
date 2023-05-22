import React, { Suspense, lazy } from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import Docs from './Docs/Docs';
import { useAppSelector } from '../../store/hooks';
import { selectDocs } from '../../store/slices/docs';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

type Props = {
  auth: boolean;
};

const GraphiqlPage = ({ auth }: Props): JSX.Element => {
  const { isDocs } = useAppSelector(selectDocs);
  const Schema = lazy(() => import('./Schema/Schema'));

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      {/* <ApiInput /> */}
      <div className={styles['main-block']}>
        <Editor />
        <Docs />
        <Suspense fallback={<Loader />}>{isDocs && <Schema />}</Suspense>
      </div>
    </div>
  );
};

export default GraphiqlPage;
