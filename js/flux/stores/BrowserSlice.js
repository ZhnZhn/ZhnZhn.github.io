"use strict";

exports.__esModule = true;
exports.default = void 0;
var _BrowserActions = require("../actions/BrowserActions");
var _compStore = require("./compStore");
var _browserLogic = require("./browserLogic");
const FAILED = 'Failed';
const BrowserSlice = {
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
  }
};
var _default = exports.default = BrowserSlice;
//# sourceMappingURL=BrowserSlice.js.map