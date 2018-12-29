import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../History';
import {Link} from "react-router-dom";

import {
  makeWarning, registered
} from '../store/Actions';


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
    let data = new URLSearchParams();
    data.append('login', login);
    data.append('password', password);

    fetch('http://localhost:8080/lab4/registration', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        console.log("!");
        this.props.registered(login);
        window.sessionStorage.setItem('isAuthorised', 'true');
        window.sessionStorage.setItem('login', login);
        this.props.makeWarning('');
        history.push('main');
        history.push('main');
      }
    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ', error.message);
    });
  };

  render(){
    return (
      <div>
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
                  value='Register'
                  onClick={this.registerUser(this.state.login, this.state.password)}
                />
              </td>
            </tr>

            <tr >
              <td colSpan={2}>
                Already have account? <Link to={'log'}>Log in!</Link>
              </td>
            </tr>

          </table>
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
      registered: bindActionCreators(registered, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
