"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _defineEnumerableProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/defineEnumerableProperties"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _Type = require("../../constants/Type");

var _AskDialog = _interopRequireDefault(require("./AskDialog"));

var _ReloadDialog = _interopRequireDefault(require("./ReloadDialog"));

var _InfoDialog = _interopRequireDefault(require("./InfoDialog"));

var _AlertDialog = _interopRequireDefault(require("./AlertDialog"));

var _DescriptionDialog = _interopRequireDefault(require("./DescriptionDialog"));

var _CustomizeExportDialog = _interopRequireDefault(require("./CustomizeExportDialog"));

var _ColumnRangeDialog = _interopRequireDefault(require("./ColumnRangeDialog"));

var _ZoomDialog = _interopRequireDefault(require("./ZoomDialog"));

var _StocksBySectorDialog = _interopRequireDefault(require("./StocksBySectorDialog"));

var _SettingsDialog = _interopRequireDefault(require("../header/SettingsDialog"));

var _AddToWatchDialog = _interopRequireDefault(require("../watch-browser/AddToWatchDialog"));

var _PasteToModalDialog = _interopRequireDefault(require("../items/PasteToModalDialog"));

var _M$LOAD_ITEM, _M$EDIT_WATCH_GROUP, _M$EDIT_WATCH_LIST, _router2, _mutatorMap;

var MSG_OFFLINE = 'It seems you are offline';

var _router = (_router2 = {}, _router2[_Type.ModalDialog.ASK] = _AskDialog["default"], _router2[_Type.ModalDialog.RELOAD] = _ReloadDialog["default"], _router2[_Type.ModalDialog.INFO] = _InfoDialog["default"], _router2[_Type.ModalDialog.ALERT] = _AlertDialog["default"], _router2[_Type.ModalDialog.DESCRIPTION] = _DescriptionDialog["default"], _router2[_Type.ModalDialog.CUSTOMIZE_EXPORT] = _CustomizeExportDialog["default"], _router2[_Type.ModalDialog.COLUMN_RANGE] = _ColumnRangeDialog["default"], _router2[_Type.ModalDialog.ZOOM] = _ZoomDialog["default"], _router2[_Type.ModalDialog.SETTINGS] = _SettingsDialog["default"], _router2[_Type.ModalDialog.ADD_TO_WATCH] = _AddToWatchDialog["default"], _router2[_Type.ModalDialog.STOCKS_BY_SECTOR] = _StocksBySectorDialog["default"], _router2[_Type.ModalDialog.PASTE_TO] = _PasteToModalDialog["default"], _router2._loadWL = function _loadWL() {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === '_development') {
    this.WL = Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("js/components/watch-browser/ModalDialogs.js"));
    }).then(function (module) {
      return module["default"];
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
    /*eslint-enable no-undef */
  } else {
    this.WL = Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../../components/watch-browser/ModalDialogs"));
    }).then(function (module) {
      return module["default"];
    })["catch"](function (err) {
      return console.log(MSG_OFFLINE);
    });
  }
}, _M$LOAD_ITEM = _Type.ModalDialog.LOAD_ITEM, _mutatorMap = {}, _mutatorMap[_M$LOAD_ITEM] = _mutatorMap[_M$LOAD_ITEM] || {}, _mutatorMap[_M$LOAD_ITEM].get = function () {
  return this.WL.then(function (D) {
    return D.LoadItem;
  });
}, _M$EDIT_WATCH_GROUP = _Type.ModalDialog.EDIT_WATCH_GROUP, _mutatorMap[_M$EDIT_WATCH_GROUP] = _mutatorMap[_M$EDIT_WATCH_GROUP] || {}, _mutatorMap[_M$EDIT_WATCH_GROUP].get = function () {
  return this.WL.then(function (D) {
    return D.EditGroup;
  });
}, _M$EDIT_WATCH_LIST = _Type.ModalDialog.EDIT_WATCH_LIST, _mutatorMap[_M$EDIT_WATCH_LIST] = _mutatorMap[_M$EDIT_WATCH_LIST] || {}, _mutatorMap[_M$EDIT_WATCH_LIST].get = function () {
  return this.WL.then(function (D) {
    return D.EditList;
  });
}, _router2.loadDialogs = function loadDialogs(id) {
  switch (id) {
    case _Type.BrowserType.WATCH_LIST:
      this._loadWL();

      break;

    default:
      return undefined;
  }
}, (0, _defineEnumerableProperties2["default"])(_router2, _mutatorMap), _router2);

var RouterModalDialog = {
  getDialog: function getDialog(id) {
    return Promise.resolve(_router[id]);
  },
  loadDialogs: function loadDialogs(id) {
    _router.loadDialogs(id);
  }
};
var _default = RouterModalDialog;
exports["default"] = _default;
//# sourceMappingURL=RouterModalDialog.js.map