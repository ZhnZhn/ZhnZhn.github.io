'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchActionTypes = undefined;

var _Reflux$createActions;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WatchActionTypes = exports.WatchActionTypes = {
  ADD_ITEM: 'addItem',
  REMOVE_ITEM: 'removeItem',
  SAVE_WATCH: 'saveWatch'
};

var WatchActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, WatchActionTypes.ADD_ITEM, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.REMOVE_ITEM, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.SAVE_WATCH, {}), _Reflux$createActions));

exports.default = WatchActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\WatchActions.js.map