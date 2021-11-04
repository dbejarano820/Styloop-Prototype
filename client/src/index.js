import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import Modal from "react-modal";
import { UsersContextProvider } from './contexts/Users.js';

Modal.setAppElement("#root");

ReactDOM.render(
    <React.StrictMode>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </React.StrictMode>,
  document.getElementById("root")
);

