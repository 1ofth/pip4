import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {logout, makeWarning} from "../store/Actions";
import history from '../History';

class Header extends React.Component{
  logOut = () => event => {
    this.props.logout();
    window.sessionStorage.setItem('isAuthorised', 'false');
    window.sessionStorage.setItem('login', '');
    history.push('log');
  };

  render(){
    return(
      <div>
        <div id={'userName'}>
            {
              window.sessionStorage.getItem('isAuthorised') === 'true'
                ? window.sessionStorage.getItem('login')
                : 'Anonymous'
            }
        </div>
        <div id={'authors'} >
             Ибраимов Эдем, Морозов Иван, P3212.
        </div>
        <div id={'variant'}>
          569812
        </div>
        <input
          type="button"
          value="logout"
          hidden={!(window.sessionStorage.getItem('isAuthorised') === 'true')}
          onClick={this.logOut()}
        />
      </div>
    )
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
    logout: bindActionCreators(logout, dispatch)
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);