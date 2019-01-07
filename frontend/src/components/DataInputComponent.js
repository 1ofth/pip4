import React from 'react';
import {connect} from 'react-redux';
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
    if(!isNaN(parseFloat((String)(event.target.value).replace(',', '.')))) {
      this.setState({
        [name]: (String)(event.target.value).replace(',', '.'),
      });
      if (this.props.warning !== '') {
        this.props.makeWarning('');
      }
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
    console.log('check dot');
  };

  createOptions() {
    let result = [];
    for (let i = 5; i > 0; i--) {
      result.push(<option selected={this.props.chartR === i} value={(String)(i)}>{i}</option>);
    }
    return result;
  }

  render(){
    return (
      <div>
        <div className={'inputField'}>
          X
          <select onChange={this.handleChange('x')}>
            <option value={'3'}>3</option>
            <option value={'2'}>2</option>
            <option value={'1'}>1</option>
            <option selected={true} value={'0'}>0</option>
            <option value={'-1'}>-1</option>
            <option value={'-2'}>-2</option>
            <option value={'-3'}>-3</option>
            <option value={'-4'}>-4</option>
            <option value={'-5'}>-5</option>
          </select>
        </div>

        <div className={'inputField'}>
          Y
          <input type={'text'} value={this.state.y} onChange={this.handleChange('y')}/>
        </div>

        <div className={'inputField'}>
          R
          <select onChange={this.changeR('r')}>
            {this.createOptions()}
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
    updateChart: bindActionCreators(updateChart, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataInputComponent);