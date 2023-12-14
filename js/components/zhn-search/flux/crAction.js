"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoizeOne = _interopRequireDefault(require("memoize-one"));
var _actionTypes = require("./actionTypes");
const crAction = dispatch => ({
  loading: () => dispatch({
    type: _actionTypes.LOADING
  }),
  loadingFailed: () => dispatch({
    type: _actionTypes.LOADING_FAILED
  }),
  loaded: options => dispatch({
    type: _actionTypes.LOADED,
    options
  }),
  setTicket: ticket => dispatch({
    type: _actionTypes.SET_TICKET,
    ticket
  }),
  showOptions: () => dispatch({
    type: _actionTypes.SHOW_OPTIONS
  }),
  hideOptions: () => dispatch({
    type: _actionTypes.HIDE_OPTIONS
  }),
  toggleOptions: () => dispatch({
    type: _actionTypes.TOGGLE_OPTIONS
  })
});
var _default = exports.default = (0, _memoizeOne.default)(crAction);
//# sourceMappingURL=crAction.js.map