"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BrowserActions = exports.BAT_UPDATE_WATCH_BROWSER = void 0;
var _refluxCore = _interopRequireDefault(require("reflux-core"));
var _storeApi = require("../storeApi");
var _browserStore = require("../stores/browserStore");
var _BrowserType = require("../../constants/BrowserType");
const BAT_UPDATE_WATCH_BROWSER = exports.BAT_UPDATE_WATCH_BROWSER = 'updateWatchBrowser';
const BA = _refluxCore.default.createActions({
  [BAT_UPDATE_WATCH_BROWSER]: {}
});
Object.assign(BA, {
  showNdl: (0, _storeApi.bindTo)(_browserStore.showBrowser, _BrowserType.BT_NDL),
  showEurostat: (0, _storeApi.bindTo)(_browserStore.showBrowser, _BrowserType.BT_EUROSTAT),
  showWatch: (0, _storeApi.bindTo)(_browserStore.showBrowser, _BrowserType.BT_WATCH_LIST)
});
const BrowserActions = exports.BrowserActions = BA;
//# sourceMappingURL=BrowserActions.js.map