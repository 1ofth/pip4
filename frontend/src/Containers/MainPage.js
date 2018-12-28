import React from 'react';
import Header from "../components/Header";
import Links from "../components/Links";
import { connect } from 'react-redux';
import Chart from "../components/Chart";
import DataInputComponent from "../components/DataInputComponent";
import TableComponent from "../components/TableComponent";
import WarningComponent from "../components/WarningComponent";

class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>
        <Header/>
        { !(window.sessionStorage.getItem('isAuthorised') === 'true') ? 'No permission' :

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


        <Links/>
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
