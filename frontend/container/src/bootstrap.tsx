/* React */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* Componentes */
import App from './App';

/* Estilos */
import './index.scss';

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);