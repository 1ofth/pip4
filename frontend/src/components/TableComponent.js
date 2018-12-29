import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChart, updateTableFinished} from "../store/Actions";

class TableComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      dots: [],
      text: ''
    }
  }

  addOneRow(){
    this.state.dots.push(this.props.newDot);
    this.props.tableUpdated();
  }

  updateTable(){
    fetch('http://localhost:8080/lab4/getAll', {
      method: 'GET',
      withCredentials: true
    }).then( (response) => {
      return response.text()
    }).then( (res) => {
        this.setState({
          text : res
        });
      }
    ).catch(function (error) {
      if (error === undefined || error.response === undefined) {
        this.props.makeWarning("oi...");
      }
    });

    this.setState({
      dots: []
      });

    if(this.state.text !== undefined && this.state.text.length > 0) {
      console.log('table is updating');
      // console.log("pre:\n" + this.state.dots + '\n post:');
      let text = this.state.text
        .substr(1, this.state.text.length - 2)
        .replace('\\', '')
        .replace('\\n', '')
        .split(", ");

      for (let i = 0; i < text.length; i++) {
        const obj = JSON.parse(text[i]);

        this.state.dots.push(obj);
      }
      this.props.tableUpdated();
    }
  }


  render(){
    return(
      <div>
        {this.props.updateTable === true
          ? this.addOneRow()
          : ''
        }
        <table id={'table'}>
          <tbody>
            <tr id={'tableTitle'}><td>x</td><td>y</td><td>r</td><td>result</td></tr>
            {this.state.dots.slice(0).reverse().map(function (d, index) {
              return (<tr key={index}>
                <td>
                  {d.x}
                </td>
                <td>
                  {d.y}
                </td>
                <td>
                  {d.r}
                </td>
                <td>
                  {(String)(d.inArea)}
                </td>
              </tr> )
            })
            }
            </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chartR: state.chartR,
    updateTable: state.updateTable,
    newDot: state.newDot
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    updateChart: bindActionCreators(updateChart, dispatch),
    tableUpdated: bindActionCreators(updateTableFinished, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);