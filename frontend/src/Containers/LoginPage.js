import React from 'react';
import Header from "../components/Header";
import LoginComponent from "../components/LoginComponent";
import WarningComponent from "../components/WarningComponent";


export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>
        <div></div>

        <div>
          <Header/>

          {window.sessionStorage.getItem('isAuthorised') === 'true'
            ?
            <div className={'warning'}>
              To login again, please, log out.
            </div>
            :
            <div>

              <div className={'title'}>
                Enter your data to login
              </div>

              <LoginComponent/>
              <WarningComponent/>
            </div>
          }
        </div>
      </div>
    );
  }
}