'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _Type = require('../../constants/Type');

var _DataWL = require('../../constants/DataWL');

var _DataWL2 = _interopRequireDefault(_DataWL);

var _BrowserActions = require('../actions/BrowserActions');

var _BrowserLogic = require('./browser/BrowserLogic');

var _BrowserLogic2 = _interopRequireDefault(_BrowserLogic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Factory from '../logic/Factory';
var C = {
  FAILED: 'Failed'
};

var isWithItemCounter = _BrowserLogic2.default.isWithItemCounter,
    initBrowseMenu = _BrowserLogic2.default.initBrowseMenu,
    setIsOpen = _BrowserLogic2.default.setIsOpen,
    plusCounter = _BrowserLogic2.default.plusCounter;


var _setItemOpen = setIsOpen.bind(null, true),
    _setItemClose = setIsOpen.bind(null, false),
    _addCounter = plusCounter.bind(null, 1),
    _minusCounter = plusCounter.bind(null, -1);

var BrowserSlice = {
  browserMenu: {},
  routeDialog: {
    WL: _DataWL2.default
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
  getSourceConfig: function getSourceConfig(browserId, sourceId) {
    if (sourceId.indexOf(_Type.BrowserType.STOCKS_BY_SECTORS) > 0) {
      return _BrowserConfig2.default[browserId];
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
      var elMenu = initBrowseMenu(this, option);
      this.trigger(_BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED, {
        menuItems: elMenu, browserType: browserType
      });
    } else {
      this.trigger(_BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED, {
        json: json, browserType: browserType
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

exports.default = BrowserSlice;
//# sourceMappingURL=BrowserSlice.js.map