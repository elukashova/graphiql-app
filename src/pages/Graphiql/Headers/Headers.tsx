import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import styles from './Headers.module.css';
import { setVariables } from '../../../store/variablesReducer';
import cross from '../../../assets/cross.svg';

const Headers: React.FC = (): JSX.Element => {
  const [showHeaders, setShowHeaders] = useState(false);
  const headers = JSON.parse(localStorage.getItem('headers') || '{}');
  const [headersValue, setHeadersValue] = useState<string>(JSON.stringify(headers));

  function handleVariablesChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newVariables = event.target.value;
    setHeadersValue(newVariables);
    localStorage.setItem('headers', newVariables);
  }

  function changeShowVariables() {
    const updatedShowStatus = !showHeaders;
    setShowHeaders(updatedShowStatus);
  }

  return (
    <section className={styles['variables-section']}>
      {showHeaders ? (
        <div className={styles['variables-container']}>
          <textarea
            className={styles.textarea}
            value={headersValue || ''}
            onChange={(e) => handleVariablesChange(e)}
            placeholder="Enter variables in JSON format"
          />
          <button className={styles['button-cross']} onClick={() => changeShowVariables()}>
            <img className={styles.cross} src={cross} alt="cross" />
          </button>
        </div>
      ) : (
        <button className={styles.title} onClick={() => changeShowVariables()}>
          Headers
        </button>
      )}
    </section>
  );
};
export default Headers;
