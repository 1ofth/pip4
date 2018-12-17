import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import MainPage from "./components/MainPage";


export default () =>
  <Switch>
    <Route path="/login" exact component={LoginPage} />
    <Route path="/registration" exact component={RegistrationPage}/>

    <Route path="/main" exact component={MainPage}/>
    <Route path="/" exact component={MainPage} />

    <Route component={NotFoundPage} />
  </Switch>;
