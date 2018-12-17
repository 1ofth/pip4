import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore } from "redux";
import { mainReducer } from "./reducers/mainReducer";

import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import history from './history'

import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import MainPage from "./components/MainPage";

const store = createStore(mainReducer);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/log" exact component={LoginPage} />
        <Route path="/reg" exact component={RegistrationPage}/>

        <Route path="/main" exact component={MainPage}/>
        <Route path="/" exact component={MainPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
