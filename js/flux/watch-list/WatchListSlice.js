"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _localforage = _interopRequireDefault(require("localforage"));

var _BrowserActions = require("../actions/BrowserActions");

var _WatchActions = require("../actions/WatchActions");

var _WatchDefault = _interopRequireDefault(require("../../constants/WatchDefault"));

var _Type = require("../../constants/Type");

var _MsgWatch = _interopRequireDefault(require("../../constants/MsgWatch"));

var _Logic = _interopRequireDefault(require("./Logic"));

var WATCH_SAVED = _MsgWatch["default"].WATCH_SAVED,
    WATCH_PREV = _MsgWatch["default"].WATCH_PREV;
var STORAGE_KEY = 'WATCH_LIST_ERC',
    DIALOG_CAPTION = 'Watch List:';
var WatchListSlice = {
  watchList: _WatchDefault["default"],
  isWatchEdited: false,
  initWatchList: function initWatchList() {
    var _this = this;

    _localforage["default"].getItem(STORAGE_KEY).then(function (value) {
      _this.watchList = value || _WatchDefault["default"];

      _this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, _this.watchList);
    })["catch"](function () {
      _this.watchList = _WatchDefault["default"];

      _this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, _this.watchList);
    });
  },
  getWatchList: function getWatchList() {
    return this.watchList;
  },
  getWatchGroups: function getWatchGroups() {
    return this.watchList.groups;
  },
  getWatchListsByGroup: function getWatchListsByGroup(groupCaption) {
    var group = _Logic["default"].findGroup(this.watchList, groupCaption);

    if (!group) {
      return [];
    }

    return group.lists;
  },
  onAddItem: function onAddItem(item) {
    this._onEditWatch(_Logic["default"].addItem(this.watchList, item), _WatchActions.WatchActionTypes.ADD_ITEM);
  },
  onRemoveItem: function onRemoveItem(option) {
    _Logic["default"].removeItem(this.watchList, option);

    this._triggerUpdateWL();
  },
  _triggerUpdateWL: function _triggerUpdateWL() {
    this.isWatchEdited = true;
    this.trigger(_BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },
  _onDragDrop: function _onDragDrop(result) {
    if (result.isDone) {
      this._triggerUpdateWL();
    } else {
      this.showAlertDialog(result);
    }
  },
  onDragDropItem: function onDragDropItem(option) {
    this._onDragDrop(_Logic["default"].dragDropItem(this.watchList, option));
  },
  onDragDropList: function onDragDropList(option) {
    this._onDragDrop(_Logic["default"].dragDropList(this.watchList, option));
  },
  onDragDropGroup: function onDragDropGroup(option) {
    this._onDragDrop(_Logic["default"].dragDropGroup(this.watchList, option));
  },
  onSaveWatch: function onSaveWatch() {
    var _this2 = this;

    if (this.isWatchEdited) {
      _localforage["default"].setItem(STORAGE_KEY, this.watchList).then(function () {
        _this2.isWatchEdited = false;

        _this2.onShowModalDialog(_Type.ModalDialog.INFO, {
          caption: DIALOG_CAPTION,
          descr: WATCH_SAVED
        });
      })["catch"](function (error) {
        console.log(error);
      });
    } else {
      this.onShowModalDialog(_Type.ModalDialog.INFO, {
        caption: DIALOG_CAPTION,
        descr: WATCH_PREV
      });
    }
  },
  _onEditWatch: function _onEditWatch(result, forActionType) {
    if (result.isDone) {
      this._triggerUpdateWL();

      this.trigger(_WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED, {
        forActionType: forActionType
      });
    } else {
      this.trigger(_WatchActions.WatchActionTypes.EDIT_WATCH_FAILED, {
        messages: [result.message],
        forActionType: forActionType
      });
    }
  },
  onAddGroup: function onAddGroup(option) {
    this._onEditWatch(_Logic["default"].addGroup(this.watchList, option), _WatchActions.WatchActionTypes.ADD_GROUP);
  },
  onRenameGroup: function onRenameGroup(option) {
    this._onEditWatch(_Logic["default"].renameGroup(this.watchList, option), _WatchActions.WatchActionTypes.RENAME_GROUP);
  },
  onDeleteGroup: function onDeleteGroup(option) {
    this._onEditWatch(_Logic["default"].deleteGroup(this.watchList, option), _WatchActions.WatchActionTypes.DELETE_GROUP);
  },
  onCreateList: function onCreateList(option) {
    this._onEditWatch(_Logic["default"].createList(this.watchList, option), _WatchActions.WatchActionTypes.CREATE_LIST);
  },
  onRenameList: function onRenameList(option) {
    this._onEditWatch(_Logic["default"].renameList(this.watchList, option), _WatchActions.WatchActionTypes.RENAME_LIST);
  },
  onDeleteList: function onDeleteList(option) {
    this._onEditWatch(_Logic["default"].deleteList(this.watchList, option), _WatchActions.WatchActionTypes.DELETE_LIST);
  }
};
var _default = WatchListSlice;
exports["default"] = _default;
//# sourceMappingURL=WatchListSlice.js.map