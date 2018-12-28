import React from 'react';
import ReactDOM from 'react-dom';

import './styles/common.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';

import MainReducer from "./store/MainReducer";
import history from './History';
import LoginPage from "./Containers/LoginPage";
import RegisterPage from './Containers/RegisterPage';
import MainPage from './Containers/MainPage';
import NotFoundPage from './Containers/NotFoundPage';
import {PrivateRoute} from "./PrivateRoute";
const store = createStore(MainReducer);



export const path = '/lab4/';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path={path} exact={true} component={LoginPage} />
        <Route path={path+'log'}  component={LoginPage} />
        <Route path={path+'reg'}  component={RegisterPage}/>
        <PrivateRoute path={path+'main'}  component={MainPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);