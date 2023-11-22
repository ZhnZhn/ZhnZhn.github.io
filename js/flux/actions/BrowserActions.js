"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BrowserActions = exports.BAT_UPDATE_WATCH_BROWSER = exports.BAT_UPDATE_BROWSER_MENU = exports.BAT_SHOW_BROWSER_DYNAMIC = exports.BAT_LOAD_BROWSER_FAILED = exports.BAT_LOAD_BROWSER_DYNAMIC_COMPLETED = exports.BAT_LOAD_BROWSER_DYNAMIC = exports.BAT_INIT_BROWSER_DYNAMIC = void 0;
var _refluxCore = _interopRequireDefault(require("reflux-core"));
var _browserLogic = require("../stores/browserLogic");
var _Factory = require("../logic/Factory");
var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));
var _BrowserType = require("../../constants/BrowserType");
var _RouterModalDialog = require("../../components/dialogs/RouterModalDialog");
var _RouterDialog = require("../logic/RouterDialog");
var _fnFetch = require("../../utils/fnFetch");
var _onCatch = _interopRequireDefault(require("../logic/onCatch"));
const BAT_SHOW_BROWSER_DYNAMIC = exports.BAT_SHOW_BROWSER_DYNAMIC = 'showBrowserDynamic';
const BAT_INIT_BROWSER_DYNAMIC = exports.BAT_INIT_BROWSER_DYNAMIC = 'initBrowserDynamic';
const BAT_LOAD_BROWSER_DYNAMIC = exports.BAT_LOAD_BROWSER_DYNAMIC = 'loadBrowserDynamic';
const BAT_LOAD_BROWSER_DYNAMIC_COMPLETED = exports.BAT_LOAD_BROWSER_DYNAMIC_COMPLETED = 'loadBrowserDynamicCompleted';
const BAT_LOAD_BROWSER_FAILED = exports.BAT_LOAD_BROWSER_FAILED = 'loadBrowserFailed';
const BAT_UPDATE_WATCH_BROWSER = exports.BAT_UPDATE_WATCH_BROWSER = 'updateWatchBrowser';
const BAT_UPDATE_BROWSER_MENU = exports.BAT_UPDATE_BROWSER_MENU = 'updateBrowserMenu';
const BA = _refluxCore.default.createActions({
  [BAT_SHOW_BROWSER_DYNAMIC]: {
    children: ['done', 'init', 'failed']
  },
  [BAT_INIT_BROWSER_DYNAMIC]: {},
  [BAT_LOAD_BROWSER_DYNAMIC]: {
    children: ['completed', 'failed']
  },
  [BAT_UPDATE_WATCH_BROWSER]: {}
});
const ERR_LOAD = "Failed to load browser.",
  ERR_FOUND = "Browser hasn't found.",
  ERR_ITEM = "Browser",
  _fetchSourceMenu = _ref => {
    let {
      json,
      option,
      onCompleted
    } = _ref;
    const {
      browserType
    } = option;
    onCompleted({
      json,
      browserType
    });
  };
const _crErr = (alertDescr, alertItemId) => ({
  alertDescr,
  alertItemId
});
BA[BAT_SHOW_BROWSER_DYNAMIC].listen(function (option) {
  if (option === void 0) {
    option = {};
  }
  const _option = typeof option === 'string' ? {
      browserType: option
    } : option,
    {
      browserType: bT
    } = _option,
    config = _BrowserConfig.default[bT];
  if (bT && config) {
    if ((0, _browserLogic.getBrowserMenu)(bT)) {
      this.done(_option);
    } else {
      Promise.all([(0, _RouterModalDialog.loadModalDialogs)(bT), (0, _RouterDialog.loadDialogs)(bT)]).then(() => (0, _Factory.crAsyncBrowser)(config)).then(elBrowser => {
        this.init(elBrowser, config);
      }).catch(() => {
        this.failed({
          ..._option,
          ..._crErr(ERR_LOAD, config.caption)
        });
      });
    }
  } else {
    this.failed({
      ..._option,
      ..._crErr(ERR_FOUND, ERR_ITEM)
    });
  }
});
BA[BAT_LOAD_BROWSER_DYNAMIC].listen(function (option) {
  (0, _fnFetch.fetchJson)({
    option,
    uri: option.sourceMenuUrl,
    onFetch: _fetchSourceMenu,
    onCompleted: this.completed,
    onFailed: this.failed,
    onCatch: _onCatch.default
  });
});
const _show = BA.showBrowserDynamic;
Object.assign(BA, {
  showNdl: _show.bind(null, _BrowserType.BT_NDL),
  showEurostat: _show.bind(null, _BrowserType.BT_EUROSTAT),
  showWatch: _show.bind(null, _BrowserType.BT_WATCH_LIST)
});
const BrowserActions = exports.BrowserActions = BA;
//# sourceMappingURL=BrowserActions.js.map