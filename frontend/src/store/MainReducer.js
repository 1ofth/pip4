import {
  initialState,
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  WARNING_INCORRECT_LOGIN_DATA, WARNING_INCORRECT_DATA, REGISTRATION_COMPLETED, REGISTRATION_FAILED
} from "./States";

export default function MainReducer(state = initialState, action) {
  console.log("log:\t"+action.type);
  switch (action.type) {



    case WARNING_INCORRECT_LOGIN_DATA:
      return { ...state, message: action.payload };

    case CHANGE_LOGIN:
      return { ...state, login: action.payload, message: action.message};

    case CHANGE_PASSWORD:
      return { ...state, password: action.payload};



    case WARNING_INCORRECT_DATA:
      return { ...state, message: action.payload };

    case REGISTRATION_COMPLETED:
      return { ...state, message: action.payload};

    case REGISTRATION_FAILED:
      return { ...state, message: action.payload};

    default:
      return state;
  }
}