"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _localforage = _interopRequireDefault(require("localforage"));

var _BrowserActions = require("../actions/BrowserActions");

var _WatchActions = require("../actions/WatchActions");

var _WatchDefault = _interopRequireDefault(require("../../constants/WatchDefault"));

var _Type = require("../../constants/Type");

var _MsgWatch = require("../../constants/MsgWatch");

var _Logic = _interopRequireDefault(require("./Logic"));

const STORAGE_KEY = 'WATCH_LIST_ERC',
      DIALOG_CAPTION = 'Watch List:';
const WatchListSlice = {
  watchList: _WatchDefault.default,
  isWatchEdited: false,

  initWatchList() {
    _localforage.default.getItem(STORAGE_KEY).then(value => {
      this.watchList = value || _WatchDefault.default;
      this.trigger(_BrowserActions.BAT_UPDATE_WATCH_BROWSER, this.watchList);
    }).catch(() => {
      this.watchList = _WatchDefault.default;
      this.trigger(_BrowserActions.BAT_UPDATE_WATCH_BROWSER, this.watchList);
    });
  },

  getWatchList() {
    return this.watchList;
  },

  getWatchGroups() {
    return this.watchList.groups;
  },

  getWatchListsByGroup(groupCaption) {
    const group = _Logic.default.findGroup(this.watchList, groupCaption);

    if (!group) {
      return [];
    }

    return group.lists;
  },

  onAddItem(item) {
    this._onEditWatch(_Logic.default.addItem(this.watchList, item), _WatchActions.WatchActionTypes.ADD_ITEM);
  },

  onRemoveItem(option) {
    _Logic.default.removeItem(this.watchList, option);

    this._triggerUpdateWL();
  },

  _triggerUpdateWL() {
    this.isWatchEdited = true;
    this.trigger(_BrowserActions.BAT_UPDATE_WATCH_BROWSER, this.watchList);
  },

  _onDragDrop(result) {
    if (result.isDone) {
      this._triggerUpdateWL();
    } else {
      this.showAlertDialog(result);
    }
  },

  onDragDropItem(option) {
    this._onDragDrop(_Logic.default.dragDropItem(this.watchList, option));
  },

  onDragDropList(option) {
    this._onDragDrop(_Logic.default.dragDropList(this.watchList, option));
  },

  onDragDropGroup(option) {
    this._onDragDrop(_Logic.default.dragDropGroup(this.watchList, option));
  },

  onSaveWatch() {
    if (this.isWatchEdited) {
      _localforage.default.setItem(STORAGE_KEY, this.watchList).then(() => {
        this.isWatchEdited = false;
        this.onShowModalDialog(_Type.ModalDialog.INFO, {
          caption: DIALOG_CAPTION,
          descr: _MsgWatch.WATCH_SAVED
        });
      }).catch(error => {
        console.log(error);
      });
    } else {
      this.onShowModalDialog(_Type.ModalDialog.INFO, {
        caption: DIALOG_CAPTION,
        descr: _MsgWatch.WATCH_PREV
      });
    }
  },

  _onEditWatch(result, forActionType) {
    if (result.isDone) {
      this._triggerUpdateWL();

      this.trigger(_WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED, {
        forActionType
      });
    } else {
      this.trigger(_WatchActions.WatchActionTypes.EDIT_WATCH_FAILED, {
        messages: [result.message],
        forActionType
      });
    }
  },

  onAddGroup(option) {
    this._onEditWatch(_Logic.default.addGroup(this.watchList, option), _WatchActions.WatchActionTypes.ADD_GROUP);
  },

  onRenameGroup(option) {
    this._onEditWatch(_Logic.default.renameGroup(this.watchList, option), _WatchActions.WatchActionTypes.RENAME_GROUP);
  },

  onDeleteGroup(option) {
    this._onEditWatch(_Logic.default.deleteGroup(this.watchList, option), _WatchActions.WatchActionTypes.DELETE_GROUP);
  },

  onCreateList(option) {
    this._onEditWatch(_Logic.default.createList(this.watchList, option), _WatchActions.WatchActionTypes.CREATE_LIST);
  },

  onRenameList(option) {
    this._onEditWatch(_Logic.default.renameList(this.watchList, option), _WatchActions.WatchActionTypes.RENAME_LIST);
  },

  onDeleteList(option) {
    this._onEditWatch(_Logic.default.deleteList(this.watchList, option), _WatchActions.WatchActionTypes.DELETE_LIST);
  }

};
var _default = WatchListSlice;
exports.default = _default;
//# sourceMappingURL=WatchListSlice.js.map