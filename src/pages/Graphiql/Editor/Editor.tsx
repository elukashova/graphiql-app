import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormResponse, REQUEST } from '../../../store/slices/editorSlice';
import styles from './Editor.module.css';
import { AppDispatch, RootState } from '../../../store/store';
import submit from '../../../assets/submit.svg';
import Loading from '../../../components/Loading/Loading';
import Variables from '../Variables/Variables';
import Headers from '../Headers/Headers';
import Modal from '../../../components/Modal/Modal';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Editor: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [formValue, setFormValue] = useState<string>(
    localStorage.getItem('requestValueLS')?.trim() || REQUEST
  );

  const formResponse = useSelector((state: RootState) => state.editor.formResponse);
  const formError = useSelector((state: RootState) => state.editor.error);
  const [formErrorShow, setFormErrorShow] = useState<boolean>(!!formError?.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = localStorage.getItem('variablesValueLS')?.trim() || '';
    const headers = localStorage.getItem('headersValueLS')?.trim() || '';
    const variablesObj: Record<string, string> | undefined = variables
      ? JSON.parse(variables)
      : undefined;
    const headersObj: Record<string, string> | undefined = headers
      ? JSON.parse(headers)
      : undefined;
    setIsLoading(true);
    dispatch(
      fetchFormResponse({ query: formValue, variables: variablesObj, headers: headersObj })
    ).then(() => {
      setIsLoading(false);
      if (formError !== null) {
        setFormErrorShow(true);
      }
    });
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

  const getErrorMessage = (responseString: string) => {
    const responseObject = JSON.parse(responseString);
    const errorMessage = responseObject.errors[0].message;
    return errorMessage;
  };

  const onClose = () => {
    setFormErrorShow(false);
  };

  return (
    <section className={`${styles['editor-block']}`}>
      <>{console.log(formResponse, formError)}</>
      {formErrorShow && formError && (
        <Modal type="error" message={getErrorMessage(formError)} onClose={onClose} />
      )}
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
          <button className={styles['button-submit']} type="submit">
            <img className={styles.submit} src={submit} alt="submit" title="Submit" />
          </button>
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
