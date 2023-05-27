import styles from './Link.module.css';
import React, { MouseEventHandler } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { selectRoute } from '../../../../store/slices/route';
import useAuth from '../../../../hooks/authHook';

type Props = {
  text: string;
  label: string;
};

const AuthLink = ({ text, label }: Props): JSX.Element => {
  const { isSignUp, isSignIn } = useAppSelector(selectRoute);
  const { toggleSignUp, toggleSignIn } = useAuth();

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (isSignUp) {
      toggleSignIn();
    } else if (isSignIn) {
      toggleSignUp();
    }
  };

  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
      <a href={isSignUp ? '/signin' : '/signup'} onClick={handleClick} className={styles.link}>
        {label}
      </a>
    </div>
  );
};

export default AuthLink;
