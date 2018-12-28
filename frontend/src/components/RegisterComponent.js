import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../History';

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
        history.push('main');
      }
    }).catch(error => {
        this.props.makeWarning('There has been a problem with your fetch operation: ', error.message);
    });
  };

  render(){
    return (
      <div className={'userDataBlock'}>
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
      registered: bindActionCreators(registered, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
