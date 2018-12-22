import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import MainPage from "./components/MainPage";


export default () =>
  <Switch>
    <Route path='/lab4/login' exact={true} component={LoginPage} />
    <Route path='/lab4/registration' exact={true} component={RegistrationPage}/>

    <Route path='/lab4/main' exact={true} component={MainPage}/>
    <Route path='/lab4/ss' exact={true} component={MainPage} />

    <Route component={NotFoundPage} />
  </Switch>;
