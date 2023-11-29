"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useWatchList = exports.useMsEdit = exports.useIsWatchEdited = exports.saveWatchList = exports.renList = exports.renGroup = exports.initWatchList = exports.getWatchListsByGroup = exports.getWatchList = exports.getWatchGroups = exports.getIsWatchEdited = exports.deleteWatchItem = exports.delList = exports.delGroup = exports.ddList = exports.ddItem = exports.ddGroup = exports.crList = exports.crGroup = exports.addWatchItem = void 0;
var _localforage = _interopRequireDefault(require("localforage"));
var _WatchDefault = _interopRequireDefault(require("../../constants/WatchDefault"));
var _ModalDialogType = require("../../constants/ModalDialogType");
var _MsgWatch = require("../../constants/MsgWatch");
var _WatchActions = require("../actions/WatchActions");
var _storeApi = require("../storeApi");
var _compStore = require("../stores/compStore");
var _LogicFn = require("./LogicFn");
var _DragDropFn = require("./DragDropFn");
var _GroupFn = require("./GroupFn");
var _ListFn = require("./ListFn");
var _ItemFn = require("./ItemFn");
const STORAGE_KEY = 'WATCH_LIST_ERC',
  DIALOG_CAPTION = 'Watch List:';
const _crStore = () => ({
    isWatchEdited: false,
    watchList: _WatchDefault.default,
    msEdit: {}
  }),
  _watchListStore = (0, _storeApi.createStoreWithSelector)(_crStore),
  _selectWatchList = state => state.watchList,
  _selectMsEdit = state => state.msEdit,
  _selectIsWatchEdited = state => state.isWatchEdited,
  [_set, _get] = (0, _storeApi.getStoreApi)(_watchListStore);
const getIsWatchEdited = () => _selectIsWatchEdited(_get());
exports.getIsWatchEdited = getIsWatchEdited;
const getWatchList = () => _selectWatchList(_get());
exports.getWatchList = getWatchList;
const useWatchList = exports.useWatchList = (0, _storeApi.fUseStoreState)(_watchListStore, _selectWatchList);
const useMsEdit = exports.useMsEdit = (0, _storeApi.fCrUse)(_watchListStore, _selectMsEdit);
const useIsWatchEdited = exports.useIsWatchEdited = (0, _storeApi.fCrUse)(_watchListStore, _selectIsWatchEdited);
const getWatchGroups = () => (getWatchList() || {}).groups;
exports.getWatchGroups = getWatchGroups;
const getWatchListsByGroup = groupCaption => {
  const group = (0, _LogicFn.findGroup)(getWatchList(), groupCaption);
  return group ? group.lists : [];
};
exports.getWatchListsByGroup = getWatchListsByGroup;
const initWatchList = () => {
  _localforage.default.getItem(STORAGE_KEY).then(value => {
    _set({
      watchList: value || _WatchDefault.default
    });
  }).catch(() => {
    _set({
      watchList: _WatchDefault.default
    });
  });
};
exports.initWatchList = initWatchList;
const saveWatchList = () => {
  const _isWatchEdited = getIsWatchEdited();
  if (_isWatchEdited) {
    _localforage.default.setItem(STORAGE_KEY, getWatchList()).then(() => {
      _set({
        isWatchEdited: false
      });
      (0, _compStore.showModalDialog)(_ModalDialogType.MDT_INFO, {
        caption: DIALOG_CAPTION,
        descr: _MsgWatch.WATCH_SAVED
      });
    }).catch(error => {
      console.log(error);
    });
  } else {
    (0, _compStore.showModalDialog)(_ModalDialogType.MDT_INFO, {
      caption: DIALOG_CAPTION,
      descr: _MsgWatch.WATCH_PREV
    });
  }
};
exports.saveWatchList = saveWatchList;
const _onEditWatch = (result, forActionType) => {
  if (result.isDone) {
    _set({
      isWatchEdited: true,
      watchList: {
        ...getWatchList()
      },
      msEdit: {
        forActionType
      }
    });
  } else {
    _set({
      msEdit: {
        messages: [result.message],
        forActionType
      }
    });
  }
};
const _fEditWatch = (editEntity, EDIT_ENTITY) => option => {
  _onEditWatch(editEntity(getWatchList(), option), EDIT_ENTITY);
};
const crGroup = exports.crGroup = _fEditWatch(_GroupFn.addGroup, _WatchActions.WAT_ADD_GROUP);
const renGroup = exports.renGroup = _fEditWatch(_GroupFn.renameGroup, _WatchActions.WAT_RENAME_GROUP);
const delGroup = exports.delGroup = _fEditWatch(_GroupFn.deleteGroup, _WatchActions.WAT_DELETE_GROUP);
const crList = exports.crList = _fEditWatch(_ListFn.createList, _WatchActions.WAT_CREATE_LIST);
const renList = exports.renList = _fEditWatch(_ListFn.renameList, _WatchActions.WAT_RENAME_LIST);
const delList = exports.delList = _fEditWatch(_ListFn.deleteList, _WatchActions.WAT_DELETE_LIST);
const _addItem = _fEditWatch(_ItemFn.addItem, _WatchActions.WAT_ADD_ITEM);
const addWatchItem = item => {
  _addItem(item);
};
exports.addWatchItem = addWatchItem;
const deleteWatchItem = option => {
  (0, _ItemFn.removeItem)(getWatchList(), option);
  _set({
    isWatchEdited: true,
    watchList: {
      ...getWatchList()
    }
  });
};
exports.deleteWatchItem = deleteWatchItem;
const _onDragDrop = result => {
  if (result.isDone) {
    _set({
      isWatchEdited: true,
      watchList: {
        ...getWatchList()
      }
    });
  } else {
    (0, _compStore.showAlertDialog)(result);
  }
};
const _fDdEntity = ddEntity => option => {
  _onDragDrop(ddEntity(getWatchList(), option));
};
const ddItem = exports.ddItem = _fDdEntity(_DragDropFn.dragDropItem);
const ddList = exports.ddList = _fDdEntity(_DragDropFn.dragDropList);
const ddGroup = exports.ddGroup = _fDdEntity(_DragDropFn.dragDropGroup);
//# sourceMappingURL=watchListStore.js.map