import GraphiqlPage from './pages/Graphiql/Graphiql';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import WelcomePage from './pages/Welcome/Welcome';
import NotFound from './pages/NotFound/NotFound';
import AuthPage from './pages/Auth/Auth';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<WelcomePage />} />} />
        <Route path="/signup" element={<Layout content={<AuthPage />} />} />
        <Route path="/signin" element={<Layout content={<AuthPage />} />} />
        <Route path="/editor" element={<Layout content={<GraphiqlPage />} />} />
        <Route path="*" element={<Layout content={<NotFound />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
