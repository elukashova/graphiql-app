import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponse, updateFormValue } from '../../../store/slices/editor';
import styles from './Editor.module.css';
import { AppDispatch, RootState } from '../../../store/store';
import submit from '../../../assets/submit.svg';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Editor: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const variables = useSelector((state: RootState) => state.variables.variables);
  const headers = localStorage.getItem('headers')?.trim() || '';

  const formValue = useSelector((state: RootState) => state.editor.formValue);
  const formResponse = useSelector((state: RootState) => state.editor.formResponse);
  /* const formStatus = useSelector((state: RootState) => state.editor.status);
  const formError = useSelector((state: RootState) => state.editor.error); */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = localStorage.getItem('apiUrl') || 'https://rickandmortyapi.com/graphql';
    const variablesObj = variables ? JSON.parse(variables) : undefined;
    const headersObj: Record<string, string> | undefined = headers
      ? JSON.parse(headers)
      : undefined;
    dispatch(
      fetchFormResponse({ query: formValue, url, variables: variablesObj, headers: headersObj })
    );
  };

  const handleFormValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateFormValue(e.target.value));
    localStorage.setItem('request', formValue);
  };

  return (
    <section className={`${styles['editor-wrapper']}`}>
      <form className={`${styles['editor-section']}`} onSubmit={handleSubmit}>
        <textarea
          name="query"
          value={formValue}
          onChange={handleFormValue}
          className={`${styles.textarea}`}
        ></textarea>
        <section className={`${styles.response}`}>
          <textarea className={`${styles.textarea}`} disabled value={formResponse}></textarea>
        </section>
        <button className={styles['button-submit']} type="submit">
          <img className={styles.submit} src={submit} alt="submit" title="Submit" />
        </button>
      </form>
    </section>
  );
};

export default Editor;
