import GraphiqlPage from './pages/Graphiql/Graphiql';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import WelcomePage from './pages/Welcome/Welcome';
import NotFound from './pages/NotFound/NotFound';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<WelcomePage />} />}>
          <Route path="/editor" element={<Layout content={<GraphiqlPage />} />} />
          <Route path="*" element={<Layout content={<NotFound />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
