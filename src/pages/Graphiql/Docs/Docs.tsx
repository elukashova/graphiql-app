import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';
import React, { lazy, useState, Suspense, useEffect } from 'react';
import styles from './Docs.module.css';
import book from '../../../assets/book.svg';

import useDocs from '../../../hooks/docsHook';
import { useAppSelector } from '../../../store/hooks';
import { selectDocs } from '../../../store/slices/docs';
import Loading from '../../../components/Loading/Loading';
import { GraphQLSchema } from 'graphql';
import Modal from '../../../components/Modal/Modal';

type Error = string | null;

const Schema = lazy(() => import('./Schema/Schema'));

const Docs: React.FC = (): JSX.Element => {
  const apiUrl = 'https://data-api.oxilor.com/graphql';
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [error, setError] = useState<Error>(null);
  const [formErrorShow, setFormErrorShow] = useState<boolean>(!!error);
  const [isLoading, setIsLoading] = useState(false);
  const { isDocs } = useAppSelector(selectDocs);
  const { toggleDocs } = useDocs();

  const fetchSchema = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });
      if (response.ok) {
        try {
          const { data } = await response.json();
          const responseSchema = buildClientSchema(data);
          setSchema(responseSchema);
          setError(null);
        } catch (error) {
          setError('Failed to parse schema');
        }
      }
    } catch (error) {
      setError('Failed to fetch schema');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDocs) {
      document.body.className = styles['docs-active'];
    } else {
      document.body.className = '';
    }
  }, [isDocs]);

  const handleClick = () => {
    if (!isDocs) {
      fetchSchema();
    }
    toggleDocs();
  };

  const onClose = () => {
    setFormErrorShow(!formErrorShow);
  };

  return (
    <>
      <div className={styles['docs-container']}>
        <button className={`${styles.docs}`} type="button" onClick={handleClick}>
          <img className={styles.book} src={book} alt="Documents" title="Docs" />
        </button>
        {error && <Modal type="error" message={error} onClose={onClose} />}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        isDocs &&
        schema && (
          <Suspense fallback={<Loading />}>
            <Schema schema={schema} />
          </Suspense>
        )
      )}
    </>
  );
};

export default Docs;
