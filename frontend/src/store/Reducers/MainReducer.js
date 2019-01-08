import {
  initialState,
  LOGIN_SACCEED,
  LOGOUT,
  REGISTRATION_COMPLETED,
  REGISTRATION_FAILED,
  UPDATE_CHART,
  UPDATE_CHART_FINISHED,
  WARNING
} from "../States";

export default function MainReducer(state = initialState, action) {
  switch (action.type) {
    case WARNING:
      return {...state, message: action.payload};

    case UPDATE_CHART:
      return {...state, chartR: action.payload, updateChart: true};

    case UPDATE_CHART_FINISHED:
      return {...state, updateChart: false};

    case LOGOUT:
      return {...state, message: '', login: ''};

    case LOGIN_SACCEED:
      return {...state, message: '', login: action.payload};

    case REGISTRATION_FAILED:
      return {...state, message: 'User with this name already exists'};

    case REGISTRATION_COMPLETED:
      return {...state, message: '', login: action.payload};


    default:
      return state;
  }
}