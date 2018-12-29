import {
  DOT_ADDED, DOTS_LOADED,
  LOGIN_SACCEED, LOGOUT, REGISTRATION_COMPLETED, UPDATE_CHART, UPDATE_CHART_FINISHED,
  WARNING
} from "./States";

export function makeWarning(message) {
  return{
    type: WARNING,
    payload: message
  }
}

export function login(login) {
  return {
    type: LOGIN_SACCEED,
    payload: login
  }
}

export function logout() {
  return{
    type: LOGOUT
  }
}
export function registered(login) {
    return{
        type: REGISTRATION_COMPLETED,
        payload: login
    }
}

export function addDot(x, y, r, inArea){
  return{
    type: DOT_ADDED,
    payload: {x, y, r, inArea}
  }
}

export function tableUpdated() {
  return{
    type: DOTS_LOADED
  }
}

export function updateTable() {
  return{
    type: DOT_ADDED
  }
}
export function updateTableFinished() {
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