import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChart} from "../store/Actions";

class TableComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      dots: [],
      text: ''
    }
  }

  updateTable(){
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
      }
    }
  }


  render(){

    const list = this.state.dots.map((item, index) => {
      return <tr key={index}><td>{item.x}</td><td>{item.y}</td><td>{item.r}</td><td>{(String)(item.inArea)}</td></tr>;
    });

    return(
      <div>
        <table id={'table'}>
          <tbody>
            <tr id={'tableTitle'}><td>x</td><td>y</td><td>r</td><td>result</td></tr>
            {list}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chartR: state.chartR
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    newDot: bindActionCreators(addDot, dispatch),
    updateChart: bindActionCreators(updateChart, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);