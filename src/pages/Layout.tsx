import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './Layout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectAuth } from '../store/slices/auth';
import Loader from '../components/Loader/Loader';

type props = {
  content: JSX.Element;
};

const Layout = (props: props): JSX.Element => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAppSelector(selectAuth);
  const [authStatus, setAuthStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!authStatus) {
      return;
    }

    if (isAuth) {
      if (location.pathname === '/auth') {
        navigate('/editor');
      }
    } else {
      if (location.pathname === '/editor') {
        navigate('/');
      }
    }
  }, [isAuth, authStatus, location.pathname, navigate]);

  useEffect(() => {
    if (isAuth) {
      setAuthStatus(true);
    }
  }, [isAuth, authStatus]);

  const scrollHeader = () => {
    if (window.scrollY >= 50) setScroll(true);
    else setScroll(false);
  };

  window.addEventListener('scroll', scrollHeader);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header />
          <main className={!scroll ? `${styles.main}` : `${styles.main} ${styles.fixed}`}>
            {props.content}
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
