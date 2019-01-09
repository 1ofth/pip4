import React from 'react';
import Header from "../components/Header";
import Links from "../components/Link";

export default class LoginPage extends React.Component{
  render(){
    return (
      <div style={{background: 'yellow'}}>
        <Header title={'Not found :('}/>
        Not found
        <Links/>
      </div>
    );
  }
}