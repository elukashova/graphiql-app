import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logo from '../../../../assets/logo.svg';

const Logo = () => (
  <Link to="/">
    <img className={styles.logo} src={logo} alt="logo" />
  </Link>
);

export default Logo;
