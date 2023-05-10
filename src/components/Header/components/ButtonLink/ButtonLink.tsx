import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  readonly to: string;
  readonly label: string;
  clickCallback?: () => void;
};

const ButtonLink = ({ to, label, clickCallback }: ButtonLinkProps) => {
  return (
    <Link to={to} onClick={clickCallback}>
      <button type="button" className={styles.button}>
        {label}
      </button>
    </Link>
  );
};

export default ButtonLink;
