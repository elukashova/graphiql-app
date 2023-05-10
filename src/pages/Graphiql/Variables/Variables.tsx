import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import styles from './Variables.module.css';
import { setVariables, SetVariablesAction } from '../../../store/variablesReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Variables: React.FC = (): JSX.Element => {
  const variables = useSelector((state: RootState) => state.variables.variables);

  const dispatch = useDispatch<AppDispatch>();

  function handleVariablesChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newVariables = event.target.value;
    dispatch(setVariables(newVariables));
  }

  return (
    <div className={styles['docs-container']}>
      <button>Variables</button>

      <div className={styles.variablesPanel}>
        <textarea
          value={variables || ''}
          onChange={(e) => handleVariablesChange(e)}
          placeholder="Enter variables in JSON format"
        />
        <button>Close</button>
      </div>
    </div>
  );
};
export default Variables;
