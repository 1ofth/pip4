import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {makeWarning, register} from '../store/Actions';

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

  registerUser = (login, password) => event => {
    this.props.register(login, password);
  };

  render(){
    return (
      <table className={'inputs'}>
        <tbody>
        <tr>
          <td>
            Login
          </td>
          <td>
            <input
              type='text'
              value={this.props.login}
              onChange={this.handleChange('login')}
            />
          </td>
        </tr>
        <tr>
          <td>
            Password
          </td>
          <td>
            <input
              type='password'
              value={this.props.password}
              onChange={this.handleChange('password')}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input
              type='button'
              value='Register'
              onClick={this.registerUser(this.state.login, this.state.password)}
            />
          </td>
        </tr>
        </tbody>
      </table>
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
