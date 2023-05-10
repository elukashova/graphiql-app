import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import styles from './Variables.module.css';
import { setVariables } from '../../../store/variablesReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Variables: React.FC = (): JSX.Element => {
  const variables = useSelector((state: RootState) => state.variables.variables);
  const [showVariables, setShowVariables] = useState(variables ? variables.trim() !== '' : false);
  const dispatch = useDispatch<AppDispatch>();

  function handleVariablesChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newVariables = event.target.value;
    dispatch(setVariables(newVariables));
  }

  function changeShowVariables() {
    const updatedShowStatus = !showVariables;
    setShowVariables(updatedShowStatus);
  }

  return (
    <div className={styles['docs-container']}>
      <button onClick={() => changeShowVariables()}>Variables</button>
      {showVariables && (
        <div className={styles.variablesPanel}>
          <textarea
            value={variables || ''}
            onChange={(e) => handleVariablesChange(e)}
            placeholder="Enter variables in JSON format"
          />
          <button onClick={() => changeShowVariables()}>Close</button>
        </div>
      )}
    </div>
  );
};
export default Variables;
