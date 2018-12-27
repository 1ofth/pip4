import {
  initialState,
  WARNING_INCORRECT_DATA, REGISTRATION_COMPLETED, REGISTRATION_FAILED
} from "../States";

export default function RegisterReducer(state = initialState, action){
  console.log("reg:\t"+action.type);
  switch (action.type) {


    default:
      return state;
  }
}