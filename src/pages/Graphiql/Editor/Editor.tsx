import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponse } from '../../../store/slices/editor';
import styles from './Editor.module.css';
import { AppDispatch, RootState } from '../../../store/store';
import submit from '../../../assets/submit.svg';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import Loading from '../../../components/Loading/Loading';
import Variables from '../Variables/Variables';
import Headers from '../Headers/Headers';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Editor: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [formValue, setFormValue] = useState<string>(
    localStorage.getItem('requestValueLS')?.trim() || ''
  );

  const formResponse = useSelector((state: RootState) => state.editor.formResponse);
  const formError = useSelector((state: RootState) => state.editor.error);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = localStorage.getItem('variablesValueLS')?.trim() || '';
    const headers = localStorage.getItem('headersValueLS')?.trim() || '';
    const url = localStorage.getItem('apiUrl') || 'https://rickandmortyapi.com/graphql';
    const variablesObj: Record<string, string> | undefined = variables
      ? JSON.parse(variables)
      : undefined;
    const headersObj: Record<string, string> | undefined = headers
      ? JSON.parse(headers)
      : undefined;
    setIsLoading(true);
    dispatch(
      fetchFormResponse({ query: formValue, url, variables: variablesObj, headers: headersObj })
    ).then(() => setIsLoading(false));
  };

  const handleFormValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormValue(value);
    localStorage.setItem('requestValueLS', value);
  };

  const handleCut = () => {
    localStorage.removeItem('requestValueLS');
    setFormValue('');
  };

  return (
    <section className={`${styles['editor-block']}`}>
      <section className={`${styles['editor-wrapper']}`}>
        {isLoading && <Loading />}
        <form className={`${styles['editor-section']}`} onSubmit={handleSubmit}>
          <textarea
            name="query"
            defaultValue={formValue}
            onChange={handleFormValue}
            onCut={() => handleCut()}
            className={`${styles.textarea}`}
          ></textarea>
          <section className={`${styles.response}`}>
            <textarea className={`${styles.textarea}`} disabled value={formResponse}></textarea>
          </section>
          <ErrorBoundary fallback={`Error: ${formError}`}>
            <button className={styles['button-submit']} type="submit">
              <img className={styles.submit} src={submit} alt="submit" title="Submit" />
            </button>
          </ErrorBoundary>
        </form>
      </section>
      <aside className={`${styles['aside-section']}`}>
        <Variables />
        <Headers />
      </aside>
    </section>
  );
};

export default Editor;
