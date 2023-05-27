import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';
import React, { lazy, useState, Suspense, useEffect } from 'react';
import styles from './Docs.module.css';
import book from '../../../assets/book.svg';
import ok from '../../../assets/ok.svg';
import useDocs from '../../../hooks/docsHook';
import { useAppSelector } from '../../../store/hooks';
import { selectDocs } from '../../../store/slices/docs';
import { URL } from '../../../store/slices/editorSlice';
import Loader from '../../../components/Loader/Loader';
import { GraphQLSchema } from 'graphql';
import Modal from '../../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';

type Error = string | null;

const Schema = lazy(() => import('./Schema/Schema'));

const Docs: React.FC = (): JSX.Element => {
  const apiUrl = URL;
  const { t } = useTranslation();

  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [error, setError] = useState<Error>(null);
  const [formErrorShow, setFormErrorShow] = useState<boolean>(!!error);
  const [isLoading, setIsLoading] = useState(false);
  const { isDocs } = useAppSelector(selectDocs);
  const { toggleDocs } = useDocs();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchSchema = async (): Promise<void> => {
    setSchema(null);
    setError(null);
    setFormErrorShow(false);
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
          setFormErrorShow(false);
        } catch (error) {
          setSchema(null);
          setError(`${error}`);
          setFormErrorShow(true);
        }
      } else {
        setError('Something went wrong with API');
        setFormErrorShow(true);
        setSchema(null);
      }
    } catch (error) {
      setSchema(null);
      setError(`${error}`);
      setFormErrorShow(true);
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

  const handleClick = async () => {
    if (!isDocs) {
      await fetchSchema();
    }
    setIsOpen(!isOpen);
    toggleDocs();
  };

  const onClose = () => {
    setFormErrorShow(false);
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles['docs-container']}>
        <button
          className={`${styles.docs} ${isDocs ? styles.active : ''}`}
          type="button"
          onClick={handleClick}
        >
          <img
            className={styles.book}
            src={isOpen ? ok : book}
            alt="Documents"
            title={`${t('editor.docs')}`}
          />
        </button>
        {formErrorShow && error && <Modal type="error" message={error} onClose={onClose} />}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        isDocs &&
        schema && (
          <Suspense fallback={<Loader />}>
            <Schema schema={schema} />
          </Suspense>
        )
      )}
    </>
  );
};

export default Docs;
