import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
};

const Button = ({ text, disabled = false, type = 'button' }: ButtonProps): JSX.Element => {
  const buttonClassNames = `${styles.button} ${disabled ? styles.disabled : styles.active}`;

  return (
    <button className={buttonClassNames} type={type}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
