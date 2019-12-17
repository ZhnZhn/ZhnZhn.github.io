"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.WatchActionTypes = void 0;

var _reflux = _interopRequireDefault(require("reflux"));

var _Reflux$createActions;

var WatchActionTypes = {
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
exports.WatchActionTypes = WatchActionTypes;
var A = WatchActionTypes;

var WatchActions = _reflux["default"].createActions((_Reflux$createActions = {}, _Reflux$createActions[A.ADD_ITEM] = {}, _Reflux$createActions[A.REMOVE_ITEM] = {}, _Reflux$createActions[A.SAVE_WATCH] = {}, _Reflux$createActions[A.DRAG_DROP_GROUP] = {}, _Reflux$createActions[A.DRAG_DROP_LIST] = {}, _Reflux$createActions[A.DRAG_DROP_ITEM] = {}, _Reflux$createActions[A.ADD_GROUP] = {}, _Reflux$createActions[A.RENAME_GROUP] = {}, _Reflux$createActions[A.DELETE_GROUP] = {}, _Reflux$createActions[A.CREATE_LIST] = {}, _Reflux$createActions[A.RENAME_LIST] = {}, _Reflux$createActions[A.DELETE_LIST] = {}, _Reflux$createActions[A.EDIT_WATCH_COMPLETED] = {}, _Reflux$createActions[A.EDIT_WATCH_FAILED] = {}, _Reflux$createActions));

var _default = WatchActions;
exports["default"] = _default;
//# sourceMappingURL=WatchActions.js.map