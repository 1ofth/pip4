import {
  initialState,
  REGISTRATION_COMPLETED,
  REGISTRATION_FAILED,
  WARNING,
  LOGOUT,
  LOGIN_SACCEED,
  DOT_ADDED,
  DOTS_LOADED,
  UPDATE_CHART, UPDATE_CHART_FINISHED
} from "./States";

export default function MainReducer(state = initialState, action) {
  console.log("\t"+action.type);
  switch (action.type) {
    case WARNING:
      return { ...state, message: action.payload };

    case LOGOUT:
      return { ...state, login: ''};

    case REGISTRATION_COMPLETED:
      return { ...state, login: action.payload};

    case LOGIN_SACCEED:
      return { ...state, login: action.payload};

    case REGISTRATION_FAILED:
      return { ...state, message: 'Registration failed'};

    case DOT_ADDED:
      return { ...state, updateTable: true};

    case DOTS_LOADED:
      return { ...state, updateTable: false};

    case UPDATE_CHART:
      return { ...state, chartR: action.payload,  updateChart: true};

    case UPDATE_CHART_FINISHED:
      return { ...state, updateChart: false};

    default:
      return state;
  }
}