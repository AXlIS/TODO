import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {AuthPage} from "./components/Auth/Auth";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
        <Route exact path={['/', '/users', '/projects', '/tasks']}>
        <App/>
      </Route>
      <Route path={'/auth'}>
        <AuthPage/>
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
