import React from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonLink.module.css';

type ButtonLinkProps = {
  readonly to: string;
  readonly children: ReactNode;
};

const ButtonLink = ({ to, children }: ButtonLinkProps) => {
  return (
    <Link to={to}>
      <button type="button" className={styles.button}>
        {children}
      </button>
    </Link>
  );
};

export default ButtonLink;
