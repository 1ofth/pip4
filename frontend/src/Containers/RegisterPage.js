import React from 'react';
import Header from "../components/Header";
import RegisterComponent from "../components/RegisterComponent";
import WarningComponent from "../components/WarningComponent";

export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>
        <Header/>

        {
          window.sessionStorage.getItem('isAuthorised') === 'true'
            ?
            <div className={'warning'}>
              To register new account, please, log out.
            </div>
            :
            <div>
              <div className={'title'}>
                Enter your data to register
              </div>

              <RegisterComponent/>
              <WarningComponent/>
            </div>
        }
      </div>
    );
  }
}