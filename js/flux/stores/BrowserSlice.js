"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _Type = require("../../constants/Type");

var _DataWL = _interopRequireDefault(require("../../constants/DataWL"));

var _BrowserActions = require("../actions/BrowserActions");

var _BrowserLogic = _interopRequireDefault(require("./browser/BrowserLogic"));

//import Factory from '../logic/Factory';
var C = {
  FAILED: 'Failed'
};
var isWithItemCounter = _BrowserLogic["default"].isWithItemCounter,
    initBrowserMenu = _BrowserLogic["default"].initBrowserMenu,
    setIsOpen = _BrowserLogic["default"].setIsOpen,
    plusCounter = _BrowserLogic["default"].plusCounter,
    resetCounter = _BrowserLogic["default"].resetCounter;

var _setItemOpen = setIsOpen.bind(null, true),
    _setItemClose = setIsOpen.bind(null, false),
    _addCounter = plusCounter.bind(null, 1),
    _minusCounter = plusCounter.bind(null, -1);

var BrowserSlice = {
  browserMenu: {},
  routeDialog: {
    WL: _DataWL["default"]
  },
  isWithItemCounter: isWithItemCounter,
  getBrowserMenu: function getBrowserMenu(browserType) {
    return this.browserMenu[browserType];
  },
  setMenuItemOpen: function setMenuItemOpen(cT, bT) {
    _setItemOpen(this.browserMenu, bT, cT);
  },
  setMenuItemClose: function setMenuItemClose(cT, bT) {
    _setItemClose(this.browserMenu, bT, cT);
  },
  addMenuItemCounter: function addMenuItemCounter(cT, bT) {
    _addCounter(this.browserMenu, bT, cT);
  },
  minusMenuItemCounter: function minusMenuItemCounter(cT, bT) {
    _minusCounter(this.browserMenu, bT, cT);
  },
  resetMenuItemCounter: function resetMenuItemCounter(cT, bT) {
    resetCounter(this.browserMenu, bT, cT);
  },
  getSourceConfig: function getSourceConfig(browserId, sourceId) {
    if (sourceId.indexOf(_Type.BrowserType.STOCKS_BY_SECTORS) > 0) {
      return _BrowserConfig["default"][browserId];
    }

    var _r = this.routeDialog[browserId];
    return _r ? _r[sourceId] : undefined;
  },
  onShowBrowserDynamicDone: function onShowBrowserDynamicDone(_ref) {
    var browserType = _ref.browserType;
    this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC, browserType);
  },
  onShowBrowserDynamicInit: function onShowBrowserDynamicInit(elBrowser, option) {
    var browserType = option.browserType;
    this.browserMenu[browserType] = [];
    this.trigger(_BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC, elBrowser);
  },
  onShowBrowserDynamicFailed: function onShowBrowserDynamicFailed(option) {
    this.showAlertDialog(option);
    this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC + C.FAILED);
  },
  onLoadBrowserDynamicCompleted: function onLoadBrowserDynamicCompleted(option) {
    var json = option.json,
        browserType = option.browserType;

    if (isWithItemCounter(browserType)) {
      var elMenu = initBrowserMenu(this, option);
      this.trigger(_BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED, {
        menuItems: elMenu,
        browserType: browserType
      });
    } else {
      this.trigger(_BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED, {
        json: json,
        browserType: browserType
      });
    }
  },
  onLoadBrowserDynamicFailed: function onLoadBrowserDynamicFailed(option) {
    var alertItemId = option.alertItemId,
        caption = option.caption;
    option.alertItemId = alertItemId || caption;
    this.showAlertDialog(option);
  }
};
var _default = BrowserSlice;
exports["default"] = _default;
//# sourceMappingURL=BrowserSlice.js.map