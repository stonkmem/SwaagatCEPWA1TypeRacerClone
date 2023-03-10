import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
const root = ReactDOM.createRoot(document.getElementById('quote'));
document.addEventListener("keypress", App);
root.render(<App/>);