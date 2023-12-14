"use strict";

exports.__esModule = true;
exports.default = void 0;
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
var _default = exports.default = crAction;
//# sourceMappingURL=crAction.js.map