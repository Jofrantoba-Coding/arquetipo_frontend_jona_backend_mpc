import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { scheduleTokenRefresh, requestRefreshAccessToken } from './services/api-auth/auth';
import { getTokenExpiration } from './methods/storage';
import './resources/css/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />
);

const expirationTime = getTokenExpiration();
if (expirationTime) {
    const currentTime = new Date().getTime();
    const expiresIn = (expirationTime - currentTime) / 1000;
    if (expiresIn > 0) {
        scheduleTokenRefresh(expiresIn);
    } else {
        requestRefreshAccessToken().catch(() => {
            console.error('Failed to refresh token');
        });
    }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();