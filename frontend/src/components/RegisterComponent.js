import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {makeWarning, register, registered} from '../store/Actions';

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
    this.props.register(login, password);
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
            type='password'
            value = {this.props.password}
            onChange={this.handleChange('password')}
          />
        </div>

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    register: bindActionCreators(register, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
