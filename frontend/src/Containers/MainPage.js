import React from 'react';
import Header from "../components/Header";
import Chart from "../components/Chart";
import DataInputComponent from "../components/DataInputComponent";
import TableComponent from "../components/TableComponent";
import WarningComponent from "../components/WarningComponent";
import {LOGIN_PAGE} from "../Views";
import history from "../History";

export default class MainPage extends React.Component {
  render(){
    return (
      <div className={'container'}>
        <Header title={'Main page'}/>
        {!(window.sessionStorage.getItem('isAuthorised') === 'true') ? history.push(LOGIN_PAGE) :
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