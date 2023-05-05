import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

const Button = ({ text, disabled = false, onClick }: ButtonProps): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick();
  };

  const buttonClassNames = `${styles.button} ${disabled ? styles.disabled : styles.active}`;

  return (
    <button className={buttonClassNames} onClick={handleClick} type="button">
      <p>{text}</p>
    </button>
  );
};

export default Button;
