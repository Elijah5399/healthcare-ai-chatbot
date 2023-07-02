import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppointmentsContextProvider } from "./context/AppointmentsContext";
import { AuthenticationContextProvider } from './context/AuthenticationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <AppointmentsContextProvider>
        <App />
      </AppointmentsContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
