import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {makeWarning, registered} from '../store/Actions';

class RegisterComponent extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  // TODO make it work!
  registerUser = (login, password) => event => {
    console.log('register');
  };

  render(){
    return (
      <div className={'inputs'}>
        <div>
          <input
            type='text'
            value = {this.props.login}
            onChange={this.handleChange('login')}
          />
        </div>

        <div>
          <input
            type='text'
            value = {this.props.password}
            onChange={this.handleChange('password')}
          />
        </div>

        <div>{this.props.warning}</div>

        <div>
          <input
            type='button'
            value='Register'
            onClick={this.registerUser(this.state.login, this.state.password)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    warning: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    ///registered: bindActionCreators(registered, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
