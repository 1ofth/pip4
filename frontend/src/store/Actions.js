import {
  DOT_ADDED,
  DOTS_LOADED,
  LOGIN_FAILED,
  LOGIN_SACCEED,
  LOGOUT,
  UPDATE_CHART,
  UPDATE_CHART_FINISHED,
  WARNING
} from "./States";
import history from "../History";

export function makeWarning(message) {
  return{
    type: WARNING,
    payload: message
  }
}

export function login(login, password) {
  return (dispatch) => {
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

    })
      .then(response => {
        if (response.ok) {
          window.sessionStorage.setItem('isAuthorised', 'true');
          window.sessionStorage.setItem('login', login);
          history.push('main');

          dispatch({
            type: LOGIN_SACCEED,
            payload: login
          });
        } else {
          return response.text();
        }
      })
      .then(function (text) {
        dispatch({
          type: WARNING,
          payload: text
        });
      })
      .catch(error => {
        dispatch({
          type: WARNING,
          payload: 'There has been a problem while logging: ' + error.message
        });
      });
  }
}

export function logout() {
  return{
    type: LOGOUT
  }
}

/*
export function register(login, password) {
  return (dispatch) => {

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
    })
      .then(response => {
      if (response.ok) {

        this.props.registered(login);
        window.sessionStorage.setItem('isAuthorised', 'true');
        window.sessionStorage.setItem('login', login);
        this.props.makeWarning('');
        history.push('main');
      }
    })
      .catch(error => {
      this.props.makeWarning('There has been a problem with your fetch operation: ', error.message);
    });
    return {
      type: REGISTRATION_COMPLETED,
      payload: login
    }
  };
}*/

export function addDot(){
  return{
    type: DOT_ADDED
  }
}

export function tableUpdated() {
  return{
    type: DOTS_LOADED
  }
}

export function updateChart(newR) {
  return{
    type: UPDATE_CHART,
    payload: newR
  }
}

export function updateChartFinished() {
  return{
    type: UPDATE_CHART_FINISHED
  }
}