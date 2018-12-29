import {Redirect, Route} from "react-router";
import React from "react";

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      sessionStorage.getItem('isAuthorised') === 'false'
        ? (<Component {...props} />)
        : (<Redirect to='main' />)
    )} />
);