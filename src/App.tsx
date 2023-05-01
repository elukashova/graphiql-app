import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import WelcomePage from './pages/Welcome/Welcome';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<WelcomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
