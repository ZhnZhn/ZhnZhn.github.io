"use strict";

exports.__esModule = true;
exports.default = void 0;
var _actionTypes = require("./actionTypes");
const reducer = (state, action) => {
  switch (action.type) {
    case _actionTypes.LOADING:
      return {
        ...state,
        isLoadingFailed: false,
        isLoading: true
      };
    case _actionTypes.LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingFailed: true
      };
    case _actionTypes.LOADED:
      return {
        ...state,
        options: action.options,
        isOptions: true,
        isLoading: false
      };
    case _actionTypes.SET_TICKET:
      return {
        ...state,
        ticket: action.ticket,
        isOptions: false
      };
    case _actionTypes.SHOW_OPTIONS:
      return {
        ...state,
        isOptions: true
      };
    case _actionTypes.HIDE_OPTIONS:
      return {
        ...state,
        isOptions: false,
        isLoadingFailed: false
      };
    case _actionTypes.TOGGLE_OPTIONS:
      return {
        ...state,
        isOptions: !state.isOptions
      };
    default:
      throw new TypeError('Not existed action: ' + action.type);
  }
};
var _default = exports.default = reducer;
//# sourceMappingURL=reducer.js.map