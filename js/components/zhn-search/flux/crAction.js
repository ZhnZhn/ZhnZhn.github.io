"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _enumSearch = _interopRequireDefault(require("./enumSearch"));

var crAction = function crAction(dispatch) {
  return {
    loading: function loading() {
      return dispatch({
        type: _enumSearch["default"].LOADING
      });
    },
    loadingFailed: function loadingFailed() {
      return dispatch({
        type: _enumSearch["default"].LOADING_FAILED
      });
    },
    loaded: function loaded(options) {
      return dispatch({
        type: _enumSearch["default"].LOADED,
        options: options
      });
    },
    setTicket: function setTicket(ticket) {
      return dispatch({
        type: _enumSearch["default"].SET_TICKET,
        ticket: ticket
      });
    },
    showOptions: function showOptions() {
      return dispatch({
        type: _enumSearch["default"].SHOW_OPTIONS
      });
    },
    hideOptions: function hideOptions() {
      return dispatch({
        type: _enumSearch["default"].HIDE_OPTIONS
      });
    },
    toggleOptions: function toggleOptions() {
      return dispatch({
        type: _enumSearch["default"].TOGGLE_OPTIONS
      });
    }
  };
};

var _default = (0, _memoizeOne["default"])(crAction);

exports["default"] = _default;
//# sourceMappingURL=crAction.js.map