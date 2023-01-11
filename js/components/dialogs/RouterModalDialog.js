"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadModalDialogs = exports.getModalDialog = void 0;
var _BrowserType = require("../../constants/BrowserType");
var _ModalDialogType = require("../../constants/ModalDialogType");
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
var _PasteToModalDialog = _interopRequireDefault(require("../dialogs-modal/PasteToModalDialog"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);
const _router = {
  [_ModalDialogType.MDT_ASK]: _AskDialog.default,
  [_ModalDialogType.MDT_RELOAD]: _ReloadDialog.default,
  [_ModalDialogType.MDT_INFO]: _InfoDialog.default,
  [_ModalDialogType.MDT_ALERT]: _AlertDialog.default,
  [_ModalDialogType.MDT_DESCRIPTION]: _DescriptionDialog.default,
  [_ModalDialogType.MDT_CUSTOMIZE_EXPORT]: _CustomizeExportDialog.default,
  [_ModalDialogType.MDT_COLUMN_RANGE]: _ColumnRangeDialog.default,
  [_ModalDialogType.MDT_ZOOM]: _ZoomDialog.default,
  [_ModalDialogType.MDT_SETTINGS]: _SettingsDialog.default,
  [_ModalDialogType.MDT_ADD_TO_WATCH]: _AddToWatchDialog.default,
  [_ModalDialogType.MDT_STOCKS_BY_SECTOR]: _StocksBySectorDialog.default,
  [_ModalDialogType.MDT_PASTE_TO]: _PasteToModalDialog.default,
  _loadWL() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/watch-browser/ModalDialogs.js"))).then(module => this.WL = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    } else {
      return Promise.resolve().then(() => _interopRequireWildcard(require( /* webpackChunkName: "watch-dialogs" */
      /* webpackMode: "lazy" */
      "../../components/watch-browser/ModalDialogs"))).then(module => this.WL = _resolve(module.default)).catch(err => console.log(MSG_OFFLINE));
    }
  },
  getWL() {
    return this.WL || this._loadWL();
  },
  get [_ModalDialogType.MDT_LOAD_ITEM]() {
    return this.getWL().then(D => D.LoadItem);
  },
  get [_ModalDialogType.MDT_EDIT_WATCH_GROUP]() {
    return this.getWL().then(D => D.EditGroup);
  },
  get [_ModalDialogType.MDT_EDIT_WATCH_LIST]() {
    return this.getWL().then(D => D.EditList);
  },
  loadDialogs(id) {
    switch (id) {
      case _BrowserType.BT_WATCH_LIST:
        this._loadWL();
        break;
      default:
        return;
    }
  }
};
const getModalDialog = id => _resolve(_router[id]);
exports.getModalDialog = getModalDialog;
const loadModalDialogs = id => {
  _router.loadDialogs(id);
};
exports.loadModalDialogs = loadModalDialogs;
//# sourceMappingURL=RouterModalDialog.js.map