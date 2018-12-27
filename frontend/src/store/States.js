export const INITIAL_STATE = 'INITIAL_STATE';
export const initialState = {
  type: INITIAL_STATE,
  logged: false,
  message: ''
};

// for login
export const WARNING_INCORRECT_LOGIN_DATA = 'WARNING_INCORRECT_LOGIN_DATA';
export const LOGIN_SACCEED = 'LOGIN_SACCEED';
export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

// for registration
export const WARNING_INCORRECT_DATA = 'WARNING_INCORRECT_DATA';
export const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
