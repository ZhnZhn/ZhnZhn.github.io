'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserMenu = require('../../constants/BrowserMenu');

var _BrowserMenu2 = _interopRequireDefault(_BrowserMenu);

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _BrowserActions = require('../actions/BrowserActions');

var _DataQE = require('../../constants/DataQE');

var _DataQE2 = _interopRequireDefault(_DataQE);

var _DataWL = require('../../constants/DataWL');

var _DataWL2 = _interopRequireDefault(_DataWL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnFindObj = function fnFindObj(menu, chartType) {
  for (var i = 0, maxPart = menu.length; i < maxPart; i++) {
    for (var j = 0, maxItem = menu[i].items.length; j < maxItem; j++) {
      if (menu[i].items[j].id === chartType) {
        return menu[i].items[j];
      }
    }
  }
};

var fnSetIsOpen = function fnSetIsOpen(chartType, browserMenu, browserType, value) {
  var obj = fnFindObj(browserMenu[browserType], chartType);
  obj.isOpen = value;
};

var fnAddCounter = function fnAddCounter(chartType, browserType, browserMenu, value) {
  var obj = fnFindObj(browserMenu[browserType], chartType);
  obj.counter += value;
  obj.isOpen = true;
};

var BrowserSlice = {
  browserMenu: _BrowserMenu2.default,
  routeDialog: {
    QE: _DataQE2.default,

    WL: _DataWL2.default
  },

  getBrowserMenu: function getBrowserMenu(browserType) {
    return this.browserMenu[browserType];
  },
  setMenuItemOpen: function setMenuItemOpen(chartType, browserType) {
    fnSetIsOpen(chartType, this.browserMenu, browserType, true);
  },
  setMenuItemClose: function setMenuItemClose(chartType, browserType) {
    fnSetIsOpen(chartType, this.browserMenu, browserType, false);
  },
  addMenuItemCounter: function addMenuItemCounter(chartType, browserType) {
    fnAddCounter(chartType, browserType, this.browserMenu, 1);
  },
  minusMenuItemCounter: function minusMenuItemCounter(chartType, browserType) {
    fnAddCounter(chartType, browserType, this.browserMenu, -1);
  },
  getSourceConfig: function getSourceConfig(browserId, sourceId) {
    return this.routeDialog[browserId][sourceId];
  },
  onShowBrowser: function onShowBrowser(browserType) {
    this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER, browserType);
  },
  onShowBrowserDynamic: function onShowBrowserDynamic(option) {
    var browserType = option.browserType;

    if (!this.browserMenu[browserType]) {
      var elBrowser = _Factory2.default.createBrowserDynamic(option);
      this.browserMenu[browserType] = [];
      this.trigger(_BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC, elBrowser);
    } else {
      this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC, browserType);
    }
  },
  onLoadBrowserDynamicCompleted: function onLoadBrowserDynamicCompleted(option) {
    var menu = option.menu;
    var items = option.items;
    var browserType = option.browserType;
    var elMenu = _BrowserMenu2.default.createMenu(menu, items, browserType);
    this.routeDialog[browserType] = items;
    this.browserMenu[browserType] = elMenu;
    this.trigger(_BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED, {
      menuItems: elMenu, browserType: browserType
    });
  },
  onLoadBrowserDynamicFailed: function onLoadBrowserDynamicFailed(option) {
    option.alertItemId = option.alertItemId ? option.alertItemId : option.caption;
    this.showAlertDialog(option);
  }
};

exports.default = BrowserSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\BrowserSlice.js.map