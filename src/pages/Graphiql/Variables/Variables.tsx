import React, { useEffect, useState } from 'react';
import styles from './Variables.module.css';
import cross from '../../../assets/cross.svg';
import { isValidJsonString } from '../utils';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';

interface ValidationState {
  showValidation: boolean;
  errorMessage: string;
}

const Variables: React.FC = (): JSX.Element => {
  const variablesFromLS = localStorage.getItem('variablesValueLS');
  const variables = JSON.parse(variablesFromLS || '{}');
  const [showVariables, setShowVariables] = useState(!!variablesFromLS);
  const [validationState, setValidationState] = useState<ValidationState>({
    showValidation: false,
    errorMessage: '',
  });
  const isEmptyVariables = Object.keys(variables).length === 0 && variables.constructor === Object;
  const [variablesValue, setVariablesValue] = useState<string>(
    isEmptyVariables ? '' : JSON.stringify(variables)
  );

  useEffect((): void => {
    const { isValid, errorMessage } = isValidJsonString(variablesValue);

    if (isValid) {
      localStorage.setItem('variablesValueLS', variablesValue);
      setValidationState({ showValidation: false, errorMessage: '' });
    } else {
      setValidationState({
        showValidation: true,
        errorMessage: `Invalid variables format: ${errorMessage}`,
      });
    }
  }, [variablesValue]);

  const handleVariablesChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newVariables = event.target.value;
    setVariablesValue(newVariables);
  };

  const handleCloseValidation = (): void => {
    setValidationState({ showValidation: false, errorMessage: '' });
    handleClearVariables();
    setShowVariables(false);
  };

  const changeShowVariables = (): void => {
    const updatedShowStatus = !showVariables;
    setShowVariables(updatedShowStatus);
  };

  const handleClearVariables = (): void => {
    localStorage.removeItem('variablesValueLS');
    setVariablesValue('');
  };

  const handleCut = (): void => {
    handleClearVariables();
  };

  return (
    <section className={styles['variables-section']}>
      {showVariables ? (
        <ErrorBoundary fallback="Can't get data from API with these variables">
          <div className={styles['variables-container']}>
            <textarea
              className={styles.textarea}
              value={variablesValue || ''}
              onChange={(e) => handleVariablesChange(e)}
              onCut={() => handleCut()}
              placeholder="Enter variables in JSON format"
            />
            <button className={styles['button-cross']} onClick={() => handleCloseValidation()}>
              <img className={styles.cross} src={cross} alt="cross" />
            </button>
          </div>
          {validationState.showValidation && variablesValue && (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{validationState.errorMessage}</p>
            </div>
          )}
        </ErrorBoundary>
      ) : (
        <button className={styles.title} onClick={() => changeShowVariables()}>
          Variables
        </button>
      )}
    </section>
  );
};

export default Variables;
