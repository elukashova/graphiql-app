import React, { useEffect, useState } from 'react';
import styles from './ApiInput.module.css';

const ApiInput: React.FC = (): JSX.Element => {
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    const apiUrlFromStorage: string | null = localStorage.getItem('apiUrl');
    if (apiUrlFromStorage) {
      setApiUrl(apiUrlFromStorage);
    } else {
      localStorage.setItem('apiUrl', 'https://rickandmortyapi.com/graphql');
      setApiUrl('https://rickandmortyapi.com/graphql');
    }
  }, []);

  const handleApiUrlChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newApiUrl: string = event.target.value;
    setApiUrl(newApiUrl);
    localStorage.setItem('apiUrl', newApiUrl);
  };

  return (
    <div className={styles['api-container']}>
      <label className={styles['api-label']} htmlFor="api">
        Current API:
      </label>
      <input
        className={styles['api-input']}
        type="text"
        id="api"
        defaultValue={apiUrl}
        onChange={handleApiUrlChange}
      />
    </div>
  );
};

export default ApiInput;
