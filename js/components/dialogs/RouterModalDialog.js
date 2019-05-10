'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineEnumerableProperties2 = require('babel-runtime/helpers/defineEnumerableProperties');

var _defineEnumerableProperties3 = _interopRequireDefault(_defineEnumerableProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _M$LOAD_ITEM, _M$EDIT_WATCH_GROUP, _M$EDIT_WATCH_LIST, _router2, _mutatorMap;

var _Type = require('../../constants/Type');

var _AskDialog = require('./AskDialog');

var _AskDialog2 = _interopRequireDefault(_AskDialog);

var _ReloadDialog = require('./ReloadDialog');

var _ReloadDialog2 = _interopRequireDefault(_ReloadDialog);

var _InfoDialog = require('./InfoDialog');

var _InfoDialog2 = _interopRequireDefault(_InfoDialog);

var _AlertDialog = require('./AlertDialog');

var _AlertDialog2 = _interopRequireDefault(_AlertDialog);

var _DescriptionDialog = require('./DescriptionDialog');

var _DescriptionDialog2 = _interopRequireDefault(_DescriptionDialog);

var _CustomizeExportDialog = require('./CustomizeExportDialog');

var _CustomizeExportDialog2 = _interopRequireDefault(_CustomizeExportDialog);

var _ColumnRangeDialog = require('./ColumnRangeDialog');

var _ColumnRangeDialog2 = _interopRequireDefault(_ColumnRangeDialog);

var _ZoomDialog = require('./ZoomDialog');

var _ZoomDialog2 = _interopRequireDefault(_ZoomDialog);

var _UsStocksBySectorDialog = require('./UsStocksBySectorDialog');

var _UsStocksBySectorDialog2 = _interopRequireDefault(_UsStocksBySectorDialog);

var _StocksBySectorDialog = require('./StocksBySectorDialog');

var _StocksBySectorDialog2 = _interopRequireDefault(_StocksBySectorDialog);

var _SettingsDialog = require('../header/SettingsDialog');

var _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);

var _AddToWatchDialog = require('../watch-browser/AddToWatchDialog');

var _AddToWatchDialog2 = _interopRequireDefault(_AddToWatchDialog);

var _PasteToModalDialog = require('../items/PasteToModalDialog');

var _PasteToModalDialog2 = _interopRequireDefault(_PasteToModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MSG_OFFLINE = 'It seems you are offline';

var _router = (_router2 = {}, (0, _defineProperty3.default)(_router2, _Type.ModalDialog.ASK, _AskDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.RELOAD, _ReloadDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.INFO, _InfoDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.ALERT, _AlertDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.DESCRIPTION, _DescriptionDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.CUSTOMIZE_EXPORT, _CustomizeExportDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.COLUMN_RANGE, _ColumnRangeDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.ZOOM, _ZoomDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.SETTINGS, _SettingsDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.ADD_TO_WATCH, _AddToWatchDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.US_STOCK_BY_SECTOR, _UsStocksBySectorDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.STOCKS_BY_SECTOR, _StocksBySectorDialog2.default), (0, _defineProperty3.default)(_router2, _Type.ModalDialog.PASTE_TO, _PasteToModalDialog2.default), (0, _defineProperty3.default)(_router2, '_loadWL', function _loadWL() {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === 'development') {
    this.WL = System.import("js/components/watch-browser/ModalDialogs.js").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
    /*eslint-enable no-undef */
  } else {
    this.WL = System.import(
    /* webpackChunkName: "watch-dialogs" */
    /* webpackMode: "lazy" */
    "../../components/watch-browser/ModalDialogs").then(function (module) {
      return module.default;
    }).catch(function (err) {
      return console.log(MSG_OFFLINE);
    });
  }
}), _M$LOAD_ITEM = _Type.ModalDialog.LOAD_ITEM, _mutatorMap = {}, _mutatorMap[_M$LOAD_ITEM] = _mutatorMap[_M$LOAD_ITEM] || {}, _mutatorMap[_M$LOAD_ITEM].get = function () {
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
}, (0, _defineProperty3.default)(_router2, 'loadDialogs', function loadDialogs(id) {
  switch (id) {
    case _Type.BrowserType.WATCH_LIST:
      this._loadWL();break;
    default:
      return undefined;
  }
}), (0, _defineEnumerableProperties3.default)(_router2, _mutatorMap), _router2);

var RouterModalDialog = {
  getDialog: function getDialog(id) {
    return Promise.resolve(_router[id]);
  },
  loadDialogs: function loadDialogs(id) {
    _router.loadDialogs(id);
  }
};

exports.default = RouterModalDialog;
//# sourceMappingURL=RouterModalDialog.js.map