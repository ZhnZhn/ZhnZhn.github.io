'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _enumSearch = require('./enumSearch');

var _enumSearch2 = _interopRequireDefault(_enumSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _enumSearch2.default.LOADING:
      return (0, _extends3.default)({}, state, {
        isLoadingFailed: false,
        isLoading: true
      });
    case _enumSearch2.default.LOADING_FAILED:
      return (0, _extends3.default)({}, state, {
        isLoading: false,
        isLoadingFailed: true
      });
    case _enumSearch2.default.LOADED:
      return (0, _extends3.default)({}, state, {
        options: action.options,
        isOptions: true,
        isLoading: false
      });
    case _enumSearch2.default.SET_TICKET:
      return (0, _extends3.default)({}, state, {
        ticket: action.ticket,
        isOptions: false
      });
    case _enumSearch2.default.SHOW_OPTIONS:
      return (0, _extends3.default)({}, state, {
        isOptions: true
      });
    case _enumSearch2.default.HIDE_OPTIONS:
      return (0, _extends3.default)({}, state, {
        isOptions: false,
        isLoadingFailed: false
      });
    case _enumSearch2.default.TOGGLE_OPTIONS:
      return (0, _extends3.default)({}, state, {
        isOptions: !state.isOptions
      });
    default:
      throw new TypeError('Not existed action: ' + action.type);
  }
};

exports.default = reducer;
//# sourceMappingURL=reducer.js.map