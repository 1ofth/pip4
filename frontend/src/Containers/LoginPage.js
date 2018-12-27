import React from 'react';
import LoginComponent from "../components/LoginComponent";
import Header from "../components/Header";

export default class LoginPage extends React.Component{
  render(){
    return (
      <div style={{background: 'yellow'}}>
        <Header/>
        <LoginComponent/>
      </div>
    );
  }
}