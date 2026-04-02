"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadModalDialogs = exports.getModalDialog = void 0;
var _crRouter = require("../../utils/crRouter");
var _BrowserType = require("../../constants/BrowserType");
var _ModalDialogType = require("../../constants/ModalDialogType");
var _AskDialog = _interopRequireDefault(require("./AskDialog"));
var _ReloadDialog = _interopRequireDefault(require("./ReloadDialog"));
var _InfoDialog = _interopRequireDefault(require("./InfoDialog"));
var _AlertDialog = _interopRequireDefault(require("./AlertDialog"));
var _DescriptionDialog = _interopRequireDefault(require("./DescriptionDialog"));
var _ZoomDialog = _interopRequireDefault(require("./ZoomDialog"));
var _SettingsDialog = _interopRequireDefault(require("../header/SettingsDialog"));
var _AddToWatchDialog = _interopRequireDefault(require("../watch-browser/AddToWatchDialog"));
var _PasteToModalDialog = _interopRequireDefault(require("../dialogs-modal/PasteToModalDialog"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);
const _router = (0, _crRouter.crRouter)({
  [_ModalDialogType.MDT_ASK]: _AskDialog.default,
  [_ModalDialogType.MDT_RELOAD]: _ReloadDialog.default,
  [_ModalDialogType.MDT_INFO]: _InfoDialog.default,
  [_ModalDialogType.MDT_ALERT]: _AlertDialog.default,
  [_ModalDialogType.MDT_DESCRIPTION]: _DescriptionDialog.default,
  [_ModalDialogType.MDT_ZOOM]: _ZoomDialog.default,
  [_ModalDialogType.MDT_SETTINGS]: _SettingsDialog.default,
  [_ModalDialogType.MDT_ADD_TO_WATCH]: _AddToWatchDialog.default,
  [_ModalDialogType.MDT_PASTE_TO]: _PasteToModalDialog.default,
  _loadMD() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/dialogs-modal/ModalDialogs.js"))).then(module => this.MD = _resolve(module.default)).catch(_err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    } else {
      return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "modal-dialogs" */
      /* webpackMode: "lazy" */
      "../../components/dialogs-modal/ModalDialogs"))).then(module => this.MD = _resolve(module.default)).catch(_err => console.log(MSG_OFFLINE));
    }
  },
  getMD() {
    return this.MD || this._loadMD();
  },
  get [_ModalDialogType.MDT_CUSTOMIZE_EXPORT]() {
    return this.getMD().then(D => D.CeDialog);
  },
  get [_ModalDialogType.MDT_STOCKS_BY_SECTOR]() {
    return this.getMD().then(D => D.SbsDialog);
  },
  get [_ModalDialogType.MDT_COLUMN_RANGE]() {
    return this.getMD().then(D => D.CrDialog);
  },
  _loadWL() {
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return Promise.resolve().then(() => _interopRequireWildcard(require("js/components/watch-browser/ModalDialogs.js"))).then(module => this.WL = _resolve(module.default)).catch(_err => console.log(MSG_OFFLINE));
      /*eslint-enable no-undef */
    } else {
      return Promise.resolve().then(() => _interopRequireWildcard(require(/* webpackChunkName: "watch-dialogs" */
      /* webpackMode: "lazy" */
      "../../components/watch-browser/ModalDialogs"))).then(module => this.WL = _resolve(module.default)).catch(_err => console.log(MSG_OFFLINE));
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
});
const getModalDialog = id => _resolve(id ? _router[id] : void 0);
exports.getModalDialog = getModalDialog;
const loadModalDialogs = id => {
  _router.loadDialogs(id);
};
exports.loadModalDialogs = loadModalDialogs;
//# sourceMappingURL=RouterModalDialog.js.map