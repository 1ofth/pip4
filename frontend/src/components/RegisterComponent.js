import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  doLogin,
  changeLogin,
  changePassword,
  doWarningIncorrectLoginData
} from '../store/Actions';

class RegisterComponent extends React.Component{
  render(){

    const {
      logIn,
      changeLoginValue,
      changePasswordValue,
      doWarning
    } = this.props;

    return (
      <div>
        <div>
          <input
            type='text'
            value = {this.props.login}
            onChange={ (event) => {
              changeLoginValue(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type='text'
            value = {this.props.password}
            onChange={(event) => {
              changePasswordValue(event.target.value);
            }}
          />
        </div>

        <div>{this.props.warning}</div>

        <div>
          <input
            type='button'
            value='login'
            onClick={ (event) => {
              logIn(this.props.login, this.props.password);
              doWarning();
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    password: state.password,
    warning: state.warning
  };
};

const putActionsToProps = (dispatch) => {
  return {
    logIn: bindActionCreators(doLogin, dispatch),
    changeLoginValue: bindActionCreators(changeLogin, dispatch),
    changePasswordValue: bindActionCreators(changePassword, dispatch),
    doWarning:
      bindActionCreators(doWarningIncorrectLoginData, dispatch),
  };
};

export default connect(mapStateToProps, putActionsToProps)(RegisterComponent);
