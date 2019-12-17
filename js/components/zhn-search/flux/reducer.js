"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _enumSearch = _interopRequireDefault(require("./enumSearch"));

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _enumSearch["default"].LOADING:
      return (0, _extends2["default"])({}, state, {
        isLoadingFailed: false,
        isLoading: true
      });

    case _enumSearch["default"].LOADING_FAILED:
      return (0, _extends2["default"])({}, state, {
        isLoading: false,
        isLoadingFailed: true
      });

    case _enumSearch["default"].LOADED:
      return (0, _extends2["default"])({}, state, {
        options: action.options,
        isOptions: true,
        isLoading: false
      });

    case _enumSearch["default"].SET_TICKET:
      return (0, _extends2["default"])({}, state, {
        ticket: action.ticket,
        isOptions: false
      });

    case _enumSearch["default"].SHOW_OPTIONS:
      return (0, _extends2["default"])({}, state, {
        isOptions: true
      });

    case _enumSearch["default"].HIDE_OPTIONS:
      return (0, _extends2["default"])({}, state, {
        isOptions: false,
        isLoadingFailed: false
      });

    case _enumSearch["default"].TOGGLE_OPTIONS:
      return (0, _extends2["default"])({}, state, {
        isOptions: !state.isOptions
      });

    default:
      throw new TypeError('Not existed action: ' + action.type);
  }
};

var _default = reducer;
exports["default"] = _default;
//# sourceMappingURL=reducer.js.map