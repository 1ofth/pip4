import React from 'react';
import Header from "../components/Header";
import { connect } from 'react-redux';
import Chart from "../components/Chart";
import DataInputComponent from "../components/DataInputComponent";
import TableComponent from "../components/TableComponent";
import WarningComponent from "../components/WarningComponent";
import { path } from '../index';
import Link from "react-router-dom/es/Link";

class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>
        <Header/>
        { !(window.sessionStorage.getItem('isAuthorised') === 'true')
          ?
            <div>
              <div className={'warning'}>
                You have no permission to visit this page.
              </div>

              <div id={'navigation'}>
                <Link to={path+'log'}> Login </Link>
                <Link to={path+'reg'}> Register </Link>
              </div>
            </div>
          :
          <div id={'mainPageContainer'}>
            <div id={'chart'}>
              <Chart/>
            </div>

            <div id={'dataInput'}>
              <DataInputComponent/>
            </div>

            <WarningComponent/>

            <TableComponent/>
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};

export default connect(mapStateToProps)(LoginPage);
