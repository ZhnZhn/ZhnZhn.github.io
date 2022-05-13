"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _BrowserConfig = _interopRequireDefault(require("../../constants/BrowserConfig"));

var _BrowserType = require("../../constants/BrowserType");

var _DataWL = _interopRequireDefault(require("../../constants/DataWL"));

var _BrowserActions = require("../actions/BrowserActions");

var _BrowserLogic = require("./browser/BrowserLogic");

const FAILED = 'Failed';

const _setItemOpen = _BrowserLogic.setIsOpen.bind(null, true),
      _setItemClose = _BrowserLogic.setIsOpen.bind(null, false),
      _addCounter = _BrowserLogic.plusCounter.bind(null, 1),
      _minusCounter = _BrowserLogic.plusCounter.bind(null, -1);

const BrowserSlice = {
  browserMenu: {},
  routeDialog: {
    WL: _DataWL.default
  },
  isWithItemCounter: _BrowserLogic.isWithItemCounter,

  getBrowserMenu(browserType) {
    return this.browserMenu[browserType];
  },

  setMenuItemOpen(cT, bT) {
    _setItemOpen(this.browserMenu, bT, cT);
  },

  setMenuItemClose(cT, bT) {
    _setItemClose(this.browserMenu, bT, cT);
  },

  addMenuItemCounter(cT, bT) {
    _addCounter(this.browserMenu, bT, cT);
  },

  minusMenuItemCounter(cT, bT) {
    _minusCounter(this.browserMenu, bT, cT);
  },

  resetMenuItemCounter(cT, bT) {
    (0, _BrowserLogic.resetCounter)(this.browserMenu, bT, cT);
  },

  getSourceConfig(browserId, sourceId) {
    if (sourceId.indexOf(_BrowserType.BT_STOCKS_BY_SECTORS) > 0) {
      return _BrowserConfig.default[browserId];
    }

    const _r = this.routeDialog[browserId];
    return _r ? _r[sourceId] : void 0;
  },

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

    if (!this.browserMenu[browserType]) {
      this.browserMenu[browserType] = [];
      this.trigger(_BrowserActions.BAT_INIT_BROWSER_DYNAMIC, elBrowser);
    }
  },

  onShowBrowserDynamicFailed(option) {
    this.showAlertDialog(option);
    this.trigger(_BrowserActions.BAT_SHOW_BROWSER_DYNAMIC + FAILED);
  },

  onLoadBrowserDynamicCompleted(option) {
    const {
      json,
      browserType
    } = option,
          menuItems = (0, _BrowserLogic.isWithItemCounter)(browserType) ? (0, _BrowserLogic.initBrowserMenu)(this, option) : json;
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
    this.showAlertDialog(option);
    this.trigger(_BrowserActions.BAT_LOAD_BROWSER_FAILED, browserType);
  }

};
var _default = BrowserSlice;
exports.default = _default;
//# sourceMappingURL=BrowserSlice.js.map