import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App";
import Modal from "react-modal";
import {history} from './global';
import { UsersContextProvider } from './contexts/Users.js';

Modal.setAppElement("#root");

ReactDOM.render(
  <Router>
    <React.StrictMode history={history}>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

