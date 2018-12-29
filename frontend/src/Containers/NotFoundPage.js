import React from 'react';
import Header from "../components/Header";
import Link from "react-router-dom/es/Link";

import { path } from '../index';

export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>
        <Header/>

        <div className={'warning'}>
          Page was not found
        </div>

        <div id={'navigation'}>
          {
            window.sessionStorage.getItem('isAuthorised') === 'true'
             ? <Link to={path+'main'}>Back</Link>
             : <Link to={path+'log'}>Back</Link>
          }
        </div>
      </div>
    );
  }
}