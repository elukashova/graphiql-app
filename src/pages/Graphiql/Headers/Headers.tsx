import React, { useEffect, useState } from 'react';
import styles from './Headers.module.css';
import cross from '../../../assets/cross.svg';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import { isValidJsonString } from '../utils';

interface ValidationState {
  showValidation: boolean;
  errorMessage: string;
}

const Headers: React.FC = (): JSX.Element => {
  const headersFromLS = localStorage.getItem('headersValueLS');
  const headers = JSON.parse(headersFromLS || '{}');
  const [showHeaders, setShowHeaders] = useState(!!headersFromLS);
  const [validationState, setValidationState] = useState<ValidationState>({
    showValidation: false,
    errorMessage: '',
  });
  const isEmptyHeaders = Object.keys(headers).length === 0 && headers.constructor === Object;
  const [headersValue, setHeadersValue] = useState<string>(
    isEmptyHeaders ? '' : JSON.stringify(headers)
  );

  useEffect(() => {
    const { isValid, errorMessage } = isValidJsonString(headersValue);

    if (isValid) {
      localStorage.setItem('headersValueLS', headersValue);
      setValidationState({ showValidation: false, errorMessage: '' });
    } else {
      setValidationState({
        showValidation: true,
        errorMessage: `Invalid headers format: ${errorMessage}`,
      });
    }
  }, [headersValue]);

  const handleHeadersChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newHeaders = event.target.value;
    setHeadersValue(newHeaders);
  };

  const handleCloseValidation = (): void => {
    setValidationState({ showValidation: false, errorMessage: '' });
    handleClearHeaders();
    setShowHeaders(false);
  };

  const changeShowHeaders = (): void => {
    const updatedShowStatus = !showHeaders;
    setShowHeaders(updatedShowStatus);
  };

  const handleClearHeaders = (): void => {
    localStorage.removeItem('headersValueLS');
    setHeadersValue('');
  };

  const handleCut = (): void => {
    handleClearHeaders();
  };

  return (
    <section className={styles['headers-section']}>
      {showHeaders ? (
        <ErrorBoundary fallback="Can't get data from API with these headers">
          <div className={styles['headers-container']}>
            <textarea
              className={styles.textarea}
              value={headersValue || ''}
              onChange={(e) => handleHeadersChange(e)}
              onCut={() => handleCut()}
              placeholder="Enter headers in JSON format"
            />
            <button className={styles['button-cross']} onClick={() => handleCloseValidation()}>
              <img className={styles.cross} src={cross} alt="cross" />
            </button>
          </div>
          {validationState.showValidation && headersValue && (
            <p className={`${styles.error} ${validationState.showValidation ? styles.show : ''}`}>
              {validationState.errorMessage}
            </p>
          )}
        </ErrorBoundary>
      ) : (
        <button className={styles.title} onClick={() => changeShowHeaders()}>
          Headers
        </button>
      )}
    </section>
  );
};

export default Headers;
