import React from 'react';
import Header from "../components/Header";
import RegisterComponent from "../components/RegisterComponent";
import Links from "../components/Links";
import WarningComponent from "../components/WarningComponent";

export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>
        <div></div>

        <div>
          <Header/>
          <RegisterComponent/>
          <WarningComponent/>
          <Links/>
        </div>
      </div>
    );
  }
}