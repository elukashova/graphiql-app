import Button from '../../../components/Button/Button';
import React, { useState } from 'react';
import styles from './Editor.module.css';

const Editor = (): JSX.Element => {
  const url = 'https://rickandmortyapi.com/graphql';
  const [response, setResponse] = useState('response');
  const [formValue, setFormValue] = useState(
    'query { characters(filter: { name: "Morty" }) { results { name status species } } }'
  );

  const makeRequest = async (query: string): Promise<string> => {
    console.log('makeRequest');
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const result = await res.json();
    console.log(result);
    setResponse(JSON.stringify(result));
    return JSON.stringify(result);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit');
    e.preventDefault();
    makeRequest(formValue);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue(e.target.value);
  };

  return (
    <section className={`${styles['editor-wrapper']}`}>
      <form className={`${styles['editor-section']}`} onSubmit={handleSubmit}>
        <textarea
          name="query"
          value={formValue}
          onChange={handleFormChange}
          className={`${styles.textarea}`}
        ></textarea>
        <section className={`${styles.response}`}>
          <textarea className={`${styles.textarea}`} disabled value={response}></textarea>
        </section>
        <Button text="Submit" type="submit" disabled={false} />
      </form>
    </section>
  );
};

export default Editor;
