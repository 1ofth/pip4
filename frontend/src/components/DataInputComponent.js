import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChart, updateTable} from "../store/Actions";
import { checkInArea } from './Chart';

class DataInputComponent extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      x: 0,
      y: 0,
      r: this.props.chartR
    }
  }

  handleChange = name => event => {
    if(!isNaN(parseFloat((String)(event.target.value).replace(',', '.')))) {
      this.setState({
        [name]: (String)(event.target.value).replace(',', '.'),
      });
      this.props.makeWarning('');

    } else {
      this.props.makeWarning(name + " should be a number");
    }
  };

  changeR = r => event => {
    this.setState({
      r: event.target.value,
    });

    this.props.updateChart(event.target.value);
  };

  checkDot = (x, y, r) => event => {
    let data = new URLSearchParams();
    data.append('X', x);
    data.append('Y', y);
    data.append('R', r);

    fetch('http://localhost:8080/lab4/add', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.props.makeWarning('');
      }
    }).then( () => {
      this.props.newDot(x, y, r, checkInArea(x, y, r));
    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ' + error.message);
    });


  };

  render(){
    return (
      <div>
        <div className={'inputField'}>
          X
          <select defaultValue={0} onChange={this.handleChange('x')}>
            <option value={'3'}>3</option>
            <option value={'2'}>2</option>
            <option value={'1'}>1</option>
            <option value={'0'}>0</option>
            <option value={'-1'}>-1</option>
            <option value={'-2'}>-2</option>
            <option value={'-3'}>-3</option>
            <option value={'-4'}>-4</option>
            <option value={'-5'}>-5</option>
          </select>
        </div>

        <div className={'inputField'}>
          Y
          <input type={'text'} defaultValue={ 0} onChange={this.handleChange('y')}/>
        </div>

        <div className={'inputField'}>
          R
          <select defaultValue={1} onChange={this.changeR('r')}>
            <option value={'5'}>5</option>
            <option value={'4'}>4</option>
            <option value={'3'}>3</option>
            <option value={'2'}>2</option>
            <option value={'1'}>1</option>
          </select>
        </div>

        <input
          id={'dotButton'}
          type={'button'}
          disabled={
            this.props.warning !== undefined && (String)(this.props.warning).indexOf('should be a number') >= 0
          }
          onClick={this.checkDot(this.state.x, this.state.y, this.state.r)}
          value={'Check'}
        />

        <div id={'info'}>
          X ∈ [-5; 3]
          Y ∈ [-3; 5]
          R ∈ [0; 5]
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartR: state.chartR,
    warning: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    newDot: bindActionCreators(addDot, dispatch),
    updateChart: bindActionCreators(updateChart, dispatch),
    updateTable: bindActionCreators(updateTable, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataInputComponent);