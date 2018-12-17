import React, {Component} from 'react';
import {connect} from "react-redux";

import history from "../history";

import {registrate, failure} from '../actions/loginActions';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      failure: false
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  logIn = (evt) => {
    evt.preventDefault();

    let data = new URLSearchParams();
    data.append('login', this.state.login);
    data.append('password', this.state.password);

    fetch('http://localhost:8080/pip4/registration', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        window.sessionStorage.setItem('logged', 'true');
        this.props.registrate(this.state.login)
        history.push('main');
      }
    }).catch((error) => {
      this.props.failure();
      console.log('There has been a problem with your fetch operation: ', error.message);
    });
  };

  render() {
    return (
      <div className="main_div">
      <form id="formLogIn" >
      <h1>Регистрация:</h1>

      <h3>Имя пользователя:</h3>
      <input type="text" id="login" name="login" value={this.state.login} onChange={this.handleChange('login')}/>


      <h3>Пароль:</h3>
      <input id="password" name="password" type='password'  value={this.state.password} onChange={this.handleChange('password')} />
      <br/><br/>

      <input type="submit" onClick={this.registrate}/>

      </form>

      {!this.props.failure ? 'Incorrect data' : ''}

      </div>
    );
  }
}

function mapStateToProps(state)  {
  window.sessionStorage.setItem('login', state.user.login);
  return {
    isAuthorised: state.user.isAuthorised,
    login: state.user.login,
    failure: state.user.failure
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registrate : (login) => dispatch(registrate(login)),
    failure : () => dispatch(failure())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
