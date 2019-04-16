'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoizeOne = require('memoize-one');

var _memoizeOne2 = _interopRequireDefault(_memoizeOne);

var _enumSearch = require('./enumSearch');

var _enumSearch2 = _interopRequireDefault(_enumSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crAction = function crAction(dispatch) {
  return {
    loading: function loading() {
      return dispatch({
        type: _enumSearch2.default.LOADING
      });
    },
    loadingFailed: function loadingFailed() {
      return dispatch({
        type: _enumSearch2.default.LOADING_FAILED
      });
    },
    loaded: function loaded(options) {
      return dispatch({
        type: _enumSearch2.default.LOADED, options: options
      });
    },

    setTicket: function setTicket(ticket) {
      return dispatch({
        type: _enumSearch2.default.SET_TICKET, ticket: ticket
      });
    },

    showOptions: function showOptions() {
      return dispatch({
        type: _enumSearch2.default.SHOW_OPTIONS
      });
    },
    hideOptions: function hideOptions() {
      return dispatch({
        type: _enumSearch2.default.HIDE_OPTIONS
      });
    },
    toggleOptions: function toggleOptions() {
      return dispatch({
        type: _enumSearch2.default.TOGGLE_OPTIONS
      });
    }
  };
};

exports.default = (0, _memoizeOne2.default)(crAction);
//# sourceMappingURL=crAction.js.map