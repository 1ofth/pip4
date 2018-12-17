import { combineReducers } from "redux";

import {pointReducer} from "./pointReducer";
import {loginReducer} from "./loginReducer";

export const mainReducer = combineReducers({
  user: loginReducer,
  point: pointReducer
});
