import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../History';

import {
  login,
  makeWarning
} from '../store/Actions';

class LoginComponent extends React.Component{
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
  loginUser = (login, password) => event => {
    window.sessionStorage.setItem('isAuthorised', 'true');
    window.sessionStorage.setItem('login', login);
    this.props.loginU(login);
    history.push('main');

    let data = new URLSearchParams();
    data.append('login', login);
    data.append('password', password);

    fetch('http://localhost:8080/lab4/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'

    }).then(response => {
      if (response.ok) {
        // redirect to main page
        window.sessionStorage.setItem('isAuthorised', 'true');
        window.sessionStorage.setItem('login', login);
        this.props.loginU(login);
        history.push('main');
      }

    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ', error.message);
    });
  };

  render(){
    return (

        <table className={'inputs'}>
          <tr>
            <td>Login</td>
            <td>
              <input
                type='text'
                onChange={this.handleChange('login')}
              />
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input
                type='text'
                onChange={this.handleChange('password')}
              />
            </td>
          </tr>

          <tr>
            <td></td>
            <td >
              <input
                type='button'
                value='Login'
                onClick={this.loginUser(this.state.login, this.state.password)}
              />
            </td>
          </tr>

          <tr >
            <td colSpan={2}>
              {this.props.warning}
            </td>
          </tr>
        </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    loginU: bindActionCreators(login, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
