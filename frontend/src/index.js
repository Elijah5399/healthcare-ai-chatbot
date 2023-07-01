import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppointmentsContextProvider } from "./context/AppointmentsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppointmentsContextProvider>
      <App />
    </AppointmentsContextProvider>
  </React.StrictMode>
);
