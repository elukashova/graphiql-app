import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './Layout.module.css';

type props = {
  content: JSX.Element;
};

const Layout = (props: props): JSX.Element => {
  return (
    <>
      <Header />
      <main className={`${styles.main}`}>{props.content}</main>
      <Footer />
    </>
  );
};

export default Layout;
