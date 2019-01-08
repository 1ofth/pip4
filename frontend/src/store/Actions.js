import {
  DOTS_LOADED,
  LOGIN_FAILED,
  LOGIN_SACCEED,
  LOGOUT,
  REGISTRATION_COMPLETED,
  REGISTRATION_FAILED,
  UPDATE_CHART,
  UPDATE_CHART_FINISHED,
  WARNING
} from "./States";
import history from "../History";
import {MAIN_PAGE} from "../Views";

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
          history.push(MAIN_PAGE);

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

export function register(login, password) {
  return (dispatch) => {
    if ((String)(login).length < 5) {
      dispatch({
        type: WARNING,
        payload: 'Login is too short. It should have at least 5 symbols'
      });
      return;
    } else if ((String)(password).length < 4) {
      dispatch({
        type: WARNING,
        payload: 'Password is too short. It should have at least 4 symbols'
      });
      return;
    }

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
          window.sessionStorage.setItem('isAuthorised', 'true');
          window.sessionStorage.setItem('login', login);

          history.push(MAIN_PAGE);

          dispatch({
            type: REGISTRATION_COMPLETED,
            payload: login
          });
        } else {
          dispatch({
            type: REGISTRATION_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: WARNING,
          payload: 'There has been a problem while logging: ' + error.message
        });
      });

  };
}

export function addDot(x, y, r) {
  /*return (dispatch) => {
    let data = new URLSearchParams();
    data.append('X', x);
    data.append('Y', y);
    data.append('R', r);

    fetch('http://localhost:8080/lab4/add', {
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

          history.push(MAIN_PAGE);

          dispatch({
            type: REGISTRATION_COMPLETED,
            payload: login
          });
        } else {
          dispatch({
            type: REGISTRATION_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: WARNING,
          payload: 'There has been a problem while logging: ' + error.message
        });
      });
  }*/
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