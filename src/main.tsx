import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store/store';
import './lang/lang';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ErrorBoundary fallback="Oops! We're sorry, but something went wrong with the application. The application is currently experiencing technical difficulties that prevent it from functioning properly. Our team is working hard to fix the issue and restore normal operation as soon as possible. In the meantime, please try refreshing the page or restarting the application. Thank you for your patience and understanding.">
      <App />
    </ErrorBoundary>
  </Provider>
);
