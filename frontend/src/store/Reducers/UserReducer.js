import {initialState, LOGIN_SACCEED, LOGOUT, REGISTRATION_COMPLETED, REGISTRATION_FAILED} from "../States";

export default function UserReducer(state = initialState, action) {
  switch (action.type) {

    case LOGOUT:
      return {...state, login: '', message: ''};

    case LOGIN_SACCEED:
      return {...state, login: action.payload};


    case REGISTRATION_COMPLETED:
      return {...state, login: action.payload};

    case REGISTRATION_FAILED:
      return {...state, message: 'Registration failed'};


    default:
      return state;
  }
}