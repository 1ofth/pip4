import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChart} from "../store/Actions";

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
    this.setState({
      [name]: event.target.value,
    });
  };

  changeR = r => event => {
    this.props.updateChart(event.target.value);
  };

  checkDot = (x, y, r) => event => {
    let data = new URLSearchParams();
    data.append('X', x);
    data.append('Y', y);
    data.append('R', r);

    fetch('http://localhost:8080/lab4/secure/add', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.props.newDot();
      } else {
        this.props.makeWarning('ODZ!');
      }
    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ' + error.message);
    });
  };

  render(){
    return (
      <div>
        <div className={'inputField'}>
          X
          <select onChange={this.handleChange('x')}>
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
          <input type={'text'} onChange={this.handleChange('y')}/>
        </div>

        <div className={'inputField'}>
          R
          <select value={1} onChange={this.changeR('r')}>
            <option value={'5'}>5</option>
            <option value={'4'}>4</option>
            <option value={'3'}>3</option>
            <option value={'2'}>2</option>
            <option value={'1'}>1</option>
          </select>
        </div>

        <input
          id={'checkDotButton'}
          type={'button'}
          onClick={this.checkDot(this.state.x, this.state.y, this.state.r)}
          value={'Check'}
        />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DataInputComponent);