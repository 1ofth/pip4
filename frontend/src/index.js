import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Route, Router, Switch} from 'react-router-dom';
import thunk from 'redux-thunk'
import {initialState} from "./store/States";
import {createLogger} from 'redux-logger'

import history from './History';

import {PrivateRoute} from "./PrivateRoute";

import {LOGIN_PAGE, MAIN_PAGE, path, REGISTRATION_PAGE} from "./Views";

import LoginPage from "./Containers/LoginPage";
import RegisterPage from './Containers/RegisterPage';
import MainPage from './Containers/MainPage';
import NotFoundPage from './Containers/NotFoundPage';

import MainReducer from "./store/Reducers/MainReducer";

import './styles/common.css';


const logger = createLogger();
const store = createStore(MainReducer, initialState, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path={path} exact={true} component={LoginPage} />
        <Route path={path + LOGIN_PAGE} component={LoginPage}/>
        <Route path={path + REGISTRATION_PAGE} component={RegisterPage}/>
        <PrivateRoute path={path + MAIN_PAGE} component={MainPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);