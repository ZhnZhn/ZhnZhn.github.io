"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _BrowserActions = require("../actions/BrowserActions");
var _compStore = require("./compStore");
var _isWithItemCounter = _interopRequireDefault(require("./browser/isWithItemCounter"));
var _initBrowserMenu = _interopRequireDefault(require("./browser/initBrowserMenu"));
var _browserLogic = require("./browserLogic");
const FAILED = 'Failed';
const BrowserSlice = {
  isWithItemCounter: _isWithItemCounter.default,
  onShowBrowserDynamicDone(_ref) {
    let {
      browserType
    } = _ref;
    this.trigger(_BrowserActions.BAT_SHOW_BROWSER_DYNAMIC, browserType);
  },
  onShowBrowserDynamicInit(elBrowser, option) {
    const {
      browserType
    } = option;
    if (!(0, _browserLogic.getBrowserMenu)(browserType)) {
      (0, _browserLogic.setBrowserMenu)(browserType, []);
      this.trigger(_BrowserActions.BAT_INIT_BROWSER_DYNAMIC, elBrowser);
    }
  },
  onShowBrowserDynamicFailed(option) {
    (0, _compStore.showAlertDialog)(option);
    this.trigger(_BrowserActions.BAT_SHOW_BROWSER_DYNAMIC + FAILED);
  },
  onLoadBrowserDynamicCompleted(option) {
    const {
        json,
        browserType
      } = option,
      menuItems = (0, _isWithItemCounter.default)(browserType) ? (0, _initBrowserMenu.default)(_browserLogic.setBrowserMenu, _browserLogic.setRouterDialog, option) : json;
    this.trigger(_BrowserActions.BAT_LOAD_BROWSER_DYNAMIC_COMPLETED, {
      menuItems,
      browserType
    });
  },
  onLoadBrowserDynamicFailed(option) {
    const {
      alertItemId,
      caption,
      browserType
    } = option;
    option.alertItemId = alertItemId || caption;
    (0, _compStore.showAlertDialog)();
    this.trigger(_BrowserActions.BAT_LOAD_BROWSER_FAILED, browserType);
  }
};
var _default = exports.default = BrowserSlice;
//# sourceMappingURL=BrowserSlice.js.map