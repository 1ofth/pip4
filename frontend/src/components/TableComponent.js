import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChart} from "../store/Actions";

class TableComponent extends React.Component{
  constructor(props){
    super(props);

    this.state={
      dots: [
        {x: 0, y: 0, r: 1, inArea: true},
        {x: 1, y: 0, r: 1, inArea: true}
      ]
    }
  }

  render(){
    const list = this.state.dots.map((item, index) => {
      if (item.r === this.props.chartR) {
        return <tr key={index}>
          <td>{item.x}</td>
          <td>{item.y}</td>
          <td>{item.r}</td>
          <td>{(String)(item.inArea)}</td>
        </tr>;
      }
    });

    return(
      <div>
        <table id={'table'}>
          <tbody>
            <tr><td>x</td><td>y</td><td>r</td><td>result</td></tr>
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