import GraphiqlPage from './pages/Graphiql/Graphiql';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import WelcomePage from './pages/Welcome/Welcome';
import NotFound from './pages/NotFound/NotFound';
import AuthPage from './pages/Auth/Auth';
import { useAppSelector } from './store/hooks';
import { selectAuth } from './store/slices/auth';

const App = (): JSX.Element => {
  const { isAuth } = useAppSelector(selectAuth);
  // throw new Error('Error for checking ErrorBoundary');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<WelcomePage />} />} />
        <Route path="/auth" element={<Layout content={<AuthPage />} />} />
        <Route path="/editor" element={<Layout content={<GraphiqlPage auth={isAuth} />} />} />
        <Route path="*" element={<Layout content={<NotFound />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
