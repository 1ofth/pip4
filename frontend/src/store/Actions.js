import {
  DOT_ADDED,
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
  return (dispatch) => {
    fetch('http://localhost:8080/lab4/secure/logout', {
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'

    }).then(() => {
      dispatch({
        type: LOGOUT
      });
    })
      .catch(error => {
        dispatch({
          type: WARNING,
          payload: 'There has been a problem while fetching: ' + error.message
        });
      });
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
          payload: 'There has been a problem while fetching: ' + error.message
        });
      });

  };
}

export function addDot(x, y, r, inArea) {
  return (dispatch) => {
    let data = new URLSearchParams();
    data.append('X', x);
    data.append('Y', y);
    data.append('R', r);

    fetch('http://localhost:8080/lab4/secure/add', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: DOT_ADDED,
            payload: {x, y, r, inArea}
          });
        } else {
          dispatch({
            type: WARNING,
            payload: 'You should check \'x\' and \'y\' values to be correct ( -5 <= x <= 3, -3 < y < 5 )'
          });
        }
      })
      .catch(error => {
        dispatch({
          type: WARNING,
          payload: 'There has been a problem while fetching: ' + error.message
        });
      });
  }
}

export function loadDots() {
  return (dispatch) => {
    fetch('http://localhost:8080/lab4/secure/getAll', {
      method: 'GET',
      withCredentials: true
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        dispatch({
          type: DOTS_LOADED,
          payload: response
        });
      })
      .catch(function (error) {
        dispatch({
          type: WARNING,
          payload: 'There has been a problem while fetching: ' + error.message
        });
      });
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
    payload: +newR
  }
}

export function updateChartFinished() {
  return{
    type: UPDATE_CHART_FINISHED
  }
}