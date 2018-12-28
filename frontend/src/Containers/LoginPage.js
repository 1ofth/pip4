import React from 'react';
import Header from "../components/Header";
import Links from "../components/Links";
import LoginComponent from "../components/LoginComponent";
import '../styles/common.css';

export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>

        <div>
          <div className={'header'}>
            <Header/>
          </div>

          <hr/>

          <LoginComponent/>

          <hr/>

          <Links/>
        </div>

      </div>
    );
  }
}