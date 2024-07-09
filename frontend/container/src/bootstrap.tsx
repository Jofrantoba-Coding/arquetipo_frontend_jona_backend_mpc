/* React */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* Componentes */
import App from './App';

/* Servicios API */
import { scheduleTokenRefresh, requestRefreshAccessToken } from './services/api-auth/auth';

/* Cookie Storage */
import { getTokenExpiration } from './methods/storage';

/* Estilos */
import './index.scss';

import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

const expirationTime = getTokenExpiration();

console.log('Token expiration time:', expirationTime);

if (expirationTime) {
    const currentTime = new Date().getTime();
    console.log('Current time:', currentTime);

    const expiresIn = (expirationTime - currentTime) / 1000;
    console.log('Expires in (seconds):', expiresIn);

    if (expiresIn > 0) {
        scheduleTokenRefresh(expiresIn);
    } else {
        requestRefreshAccessToken().catch(() => {
            console.error('Failed to refresh token');
        });
    }
} else {
    console.error('Expiration time is invalid or not found');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();