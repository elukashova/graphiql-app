import React, { useEffect, useState } from 'react';
import styles from './Variables.module.css';
import cross from '../../../assets/cross.svg';
import { isValidJsonString } from '../utils';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect((): void => {
    const { isValid, errorMessage } = isValidJsonString(variablesValue);

    if (isValid) {
      localStorage.setItem('variablesValueLS', variablesValue);
      setValidationState({ showValidation: false, errorMessage: '' });
    } else {
      setValidationState({
        showValidation: true,
        errorMessage: `${t('editor.variables_invalid')}: ${errorMessage}`,
      });
    }
  }, [t, variablesValue]);

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
        <ErrorBoundary fallback={`${t('errorBoundary.variables_fallback')}`}>
          <div className={styles['variables-container']}>
            <textarea
              className={styles.textarea}
              value={variablesValue || ''}
              onChange={(e) => handleVariablesChange(e)}
              onCut={() => handleCut()}
              placeholder={`${t('editor.variables_placeholder')}`}
            />
            <button className={styles['button-cross']} onClick={() => handleCloseValidation()}>
              <img className={styles.cross} src={cross} alt="cross" />
            </button>
          </div>

          {validationState.showValidation && variablesValue && (
            <p className={`${styles.error} ${validationState.showValidation ? styles.show : ''}`}>
              {validationState.errorMessage}
            </p>
          )}
        </ErrorBoundary>
      ) : (
        <button className={styles.title} onClick={() => changeShowVariables()}>
          {t('editor.variables')}
        </button>
      )}
    </section>
  );
};

export default Variables;
