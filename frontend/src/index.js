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
  <Provider store={store} >
      <Router history={history}>
          <Switch>
              <Route path='/lab4/' exact={true} component={MainPage} />
              <Route path='/lab4/login' exact={true} component={LoginPage} />
              <Route path='/lab4/registration' exact={true} component={RegistrationPage}/>
              <Route path='/lab4/main' exact={true} component={MainPage}/>

              <Route component={NotFoundPage} />
          </Switch>
      </Router>
  </Provider>,
  document.getElementById('root')
);
