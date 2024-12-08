import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TestApp from './App.test';
import reportWebVitals from './reportWebVitals';

const devmode = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {devmode ? <TestApp /> : <App />}
  </React.StrictMode>
);

reportWebVitals();