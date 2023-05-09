import Button from '../../../components/Button/Button';
import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponse, updateFormValue } from '../../../store/slices/editor';
import styles from './Editor.module.css';
import { AppDispatch, RootState } from '../../../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Editor: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const formValue = useSelector((state: RootState) => state.editor.formValue);
  const formResponse = useSelector((state: RootState) => state.editor.formResponse);
  /* const formStatus = useSelector((state: RootState) => state.editor.status);
  const formError = useSelector((state: RootState) => state.editor.error); */

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = localStorage.getItem('apiUrl') || 'https://rickandmortyapi.com/graphql';
    dispatch(fetchFormResponse({ query: formValue, url }));
  };

  const handleFormValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateFormValue(e.target.value));
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
        <Button text="Submit" type="submit" disabled={false} />
      </form>
    </section>
  );
};

export default Editor;
