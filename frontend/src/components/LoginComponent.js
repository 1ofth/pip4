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

    // restore this condition
    if(login.length > 0 && password.length > 0){
      window.sessionStorage.setItem('isAuthorised', 'true');
      window.sessionStorage.setItem('login', login);
      this.props.loginU(login);
      history.push('main');
      return;
    }

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
        return;
      }

    }).catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ', error.message);
    });
  };

  render(){
    return (

        <div className={'inputs'}>
          <div>
            Login
            <input
              type='text'
              onChange={this.handleChange('login')}
            />
          </div>

          <div>
            Password
            <input
              type='text'
              onChange={this.handleChange('password')}
            />
          </div>

          <div>{this.props.warning}</div>

          <div>
            <input
              type='button'
              value='Login'
              onClick={this.loginUser(this.state.login, this.state.password)}
            />
          </div>
        </div>
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
