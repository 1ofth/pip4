import {initialState, UPDATE_CHART, UPDATE_CHART_FINISHED, WARNING} from "../States";

export default function MainReducer(state = initialState, action) {
  switch (action.type) {
    case WARNING:
      return {...state, message: action.payload};

    case UPDATE_CHART:
      return {...state, chartR: action.payload, updateChart: true};

    case UPDATE_CHART_FINISHED:
      return {...state, updateChart: false};

    default:
      return state;
  }
}