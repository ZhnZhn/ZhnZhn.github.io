"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.WatchActions = exports.WAT_SAVE_WATCH = exports.WAT_RENAME_LIST = exports.WAT_RENAME_GROUP = exports.WAT_REMOVE_ITEM = exports.WAT_EDIT_WATCH_FAILED = exports.WAT_EDIT_WATCH_COMPLETED = exports.WAT_DRAG_DROP_LIST = exports.WAT_DRAG_DROP_ITEM = exports.WAT_DRAG_DROP_GROUP = exports.WAT_DELETE_LIST = exports.WAT_DELETE_GROUP = exports.WAT_CREATE_LIST = exports.WAT_ADD_ITEM = exports.WAT_ADD_GROUP = void 0;

var _refluxCore = _interopRequireDefault(require("reflux-core"));

const WAT_ADD_ITEM = 'addItem';
exports.WAT_ADD_ITEM = WAT_ADD_ITEM;
const WAT_REMOVE_ITEM = 'removeItem';
exports.WAT_REMOVE_ITEM = WAT_REMOVE_ITEM;
const WAT_SAVE_WATCH = 'saveWatch';
exports.WAT_SAVE_WATCH = WAT_SAVE_WATCH;
const WAT_DRAG_DROP_GROUP = 'dragDropGroup';
exports.WAT_DRAG_DROP_GROUP = WAT_DRAG_DROP_GROUP;
const WAT_DRAG_DROP_LIST = 'dragDropList';
exports.WAT_DRAG_DROP_LIST = WAT_DRAG_DROP_LIST;
const WAT_DRAG_DROP_ITEM = 'dragDropItem';
exports.WAT_DRAG_DROP_ITEM = WAT_DRAG_DROP_ITEM;
const WAT_ADD_GROUP = 'addGroup';
exports.WAT_ADD_GROUP = WAT_ADD_GROUP;
const WAT_RENAME_GROUP = 'renameGroup';
exports.WAT_RENAME_GROUP = WAT_RENAME_GROUP;
const WAT_DELETE_GROUP = 'deleteGroup';
exports.WAT_DELETE_GROUP = WAT_DELETE_GROUP;
const WAT_CREATE_LIST = 'createList';
exports.WAT_CREATE_LIST = WAT_CREATE_LIST;
const WAT_RENAME_LIST = 'renameList';
exports.WAT_RENAME_LIST = WAT_RENAME_LIST;
const WAT_DELETE_LIST = 'deleteList';
exports.WAT_DELETE_LIST = WAT_DELETE_LIST;
const WAT_EDIT_WATCH_COMPLETED = 'editWatchCompleted';
exports.WAT_EDIT_WATCH_COMPLETED = WAT_EDIT_WATCH_COMPLETED;
const WAT_EDIT_WATCH_FAILED = 'editWatchFailed';
exports.WAT_EDIT_WATCH_FAILED = WAT_EDIT_WATCH_FAILED;

const WatchActions = _refluxCore.default.createActions({
  [WAT_ADD_ITEM]: {},
  [WAT_REMOVE_ITEM]: {},
  [WAT_SAVE_WATCH]: {},
  [WAT_DRAG_DROP_GROUP]: {},
  [WAT_DRAG_DROP_LIST]: {},
  [WAT_DRAG_DROP_ITEM]: {},
  [WAT_ADD_GROUP]: {},
  [WAT_RENAME_GROUP]: {},
  [WAT_DELETE_GROUP]: {},
  [WAT_CREATE_LIST]: {},
  [WAT_RENAME_LIST]: {},
  [WAT_DELETE_LIST]: {},
  [WAT_EDIT_WATCH_COMPLETED]: {},
  [WAT_EDIT_WATCH_FAILED]: {}
});

exports.WatchActions = WatchActions;
//# sourceMappingURL=WatchActions.js.map