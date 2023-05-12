import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import styles from './Variables.module.css';
import { setVariables } from '../../../store/variablesReducer';
import cross from '../../../assets/cross.svg';

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
    <section className={styles['variables-section']}>
      {showVariables ? (
        <div className={styles['variables-container']}>
          <textarea
            className={styles.textarea}
            value={variables || ''}
            onChange={(e) => handleVariablesChange(e)}
            placeholder="Enter variables in JSON format"
          />
          <button className={styles['button-cross']} onClick={() => changeShowVariables()}>
            <img className={styles.cross} src={cross} alt="cross" />
          </button>
        </div>
      ) : (
        <button className={styles.title} onClick={() => changeShowVariables()}>
          Variables
        </button>
      )}
    </section>
  );
};
export default Variables;
