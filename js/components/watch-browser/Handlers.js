"use strict";

exports.__esModule = true;
exports.showDialogWatchItem = exports.showDialogEditLists = exports.showDialogEditGroups = exports.saveWatchList = exports.removeWatchItem = void 0;
var _compStore = require("../../flux/stores/compStore");
var _WatchActions = require("../../flux/actions/WatchActions");
var _ModalDialogType = require("../../constants/ModalDialogType");
const showDialogEditGroups = () => (0, _compStore.showModalDialog)(_ModalDialogType.MDT_EDIT_WATCH_GROUP);
exports.showDialogEditGroups = showDialogEditGroups;
const showDialogEditLists = () => (0, _compStore.showModalDialog)(_ModalDialogType.MDT_EDIT_WATCH_LIST);
exports.showDialogEditLists = showDialogEditLists;
const showDialogWatchItem = item => (0, _compStore.showModalDialog)(_ModalDialogType.MDT_LOAD_ITEM, item);
exports.showDialogWatchItem = showDialogWatchItem;
const removeWatchItem = (option, evt) => {
  evt.stopPropagation();
  _WatchActions.WatchActions.removeItem(option);
};
exports.removeWatchItem = removeWatchItem;
const saveWatchList = () => {
  _WatchActions.WatchActions.saveWatch();
};
exports.saveWatchList = saveWatchList;
//# sourceMappingURL=Handlers.js.map