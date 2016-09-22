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
  SAVE_WATCH: 'saveWatch',

  DRAG_DROP_GROUP: 'dragDropGroup',
  DRAG_DROP_LIST: 'dragDropList',
  DRAG_DROP_ITEM: 'dragDropItem',

  ADD_GROUP: 'addGroup',
  RENAME_GROUP: 'renameGroup',
  DELETE_GROUP: 'deleteGroup',
  CREATE_LIST: 'createList',
  RENAME_LIST: 'renameList',
  DELETE_LIST: 'deleteList',
  EDIT_WATCH_COMPLETED: 'editWatchCompleted',
  EDIT_WATCH_FAILED: 'editWatchFailed'
};

var WatchActions = _reflux2.default.createActions((_Reflux$createActions = {}, _defineProperty(_Reflux$createActions, WatchActionTypes.ADD_ITEM, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.REMOVE_ITEM, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.SAVE_WATCH, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.DRAG_DROP_GROUP, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.DRAG_DROP_LIST, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.DRAG_DROP_ITEM, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.ADD_GROUP, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.RENAME_GROUP, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.DELETE_GROUP, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.CREATE_LIST, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.RENAME_LIST, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.DELETE_LIST, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.EDIT_WATCH_COMPLETED, {}), _defineProperty(_Reflux$createActions, WatchActionTypes.EDIT_WATCH_FAILED, {}), _Reflux$createActions));

exports.default = WatchActions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\actions\WatchActions.js.map