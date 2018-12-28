import React from 'react';
import Header from "../components/Header";
import RegisterComponent from "../components/RegisterComponent";
import Links from "../components/Links";

export default class LoginPage extends React.Component{
  render(){
    return (
      <div style={{background: 'yellow'}}>
        <Header/>
        <RegisterComponent/>
        <Links/>
      </div>
    );
  }
}