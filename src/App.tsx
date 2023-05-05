/* import GraphiqlPage from './pages/Graphiql/Graphiql';
 */ /* import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import WelcomePage from './pages/Welcome/Welcome';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          {<Route path="editor" element={<GraphiqlPage />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App; */

import GraphiqlPage from './pages/Graphiql/Graphiql';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import WelcomePage from './pages/Welcome/Welcome';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="editor" element={<GraphiqlPage />} />
          <Route index element={<WelcomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
