import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';
import React, { lazy, useState, Suspense } from 'react';
import styles from './Docs.module.css';
import book from '../../../assets/book.svg';

import useDocs from '../../../hooks/docsHook';
import { useAppSelector } from '../../../store/hooks';
import { selectDocs } from '../../../store/slices/docs';
import Loading from '../../../components/Loading/Loading';
import { GraphQLSchema } from 'graphql';

type Error = string | null;

const Schema = lazy(() => import('./components/Schema/Schema'));

const Docs: React.FC = (): JSX.Element => {
  const apiUrl = 'https://data-api.oxilor.com/graphql';
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [error, setError] = useState<Error>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const { isDocs } = useAppSelector(selectDocs);
  const { toggleDocs } = useDocs();

  const handleClick = () => {
    if (!isDocs) {
      fetchSchema();
    }
    toggleDocs();
  };

  return (
    <>
      <div className={styles['docs-container']}>
        <button className={`${styles.docs}`} type="button" onClick={handleClick}>
          <img className={styles.book} src={book} alt="Documents" title="Docs" />
        </button>
        {error && <div>{error}</div>}
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
