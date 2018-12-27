import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';

import RegisterComponent from "./components/RegisterComponent";

import MainReducer from "./store/MainReducer";

import LoginPage from "./Containers/LoginPage";


const store = createStore(MainReducer);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path={'/lab4/log'} component={LoginPage} />
        <Route path={'/lab4/reg'} component={RegisterComponent}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);