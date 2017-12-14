'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserMenu = require('../../constants/BrowserMenu');

var _BrowserMenu2 = _interopRequireDefault(_BrowserMenu);

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _Type = require('../../constants/Type');

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _BrowserActions = require('../actions/BrowserActions');

var _DataQE = require('../../constants/DataQE');

var _DataQE2 = _interopRequireDefault(_DataQE);

var _DataWL = require('../../constants/DataWL');

var _DataWL2 = _interopRequireDefault(_DataWL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  FAILED: 'Failed'
};

var fnFindObj = function fnFindObj(menu, chartType) {
  if (!menu) {
    return undefined;
  }

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
  if (obj) {
    obj.isOpen = value;
  }
};

var fnAddCounter = function fnAddCounter(chartType, browserType, browserMenu, value) {
  var obj = fnFindObj(browserMenu[browserType], chartType);
  if (obj) {
    obj.counter += value;
    obj.isOpen = true;
  }
};

var _addDialogProps = function _addDialogProps(items) {
  Object.keys(items).forEach(function (propName) {
    var item = items[propName],
        addProps = item.addProps;
    if (addProps !== undefined) {
      //Object.assign(item.dialogProps, items[addProps].dialogProps)
      item.dialogProps = Object.assign({}, items[addProps].dialogProps, item.dialogProps);
    }
  });
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
  isWithItemCounter: function isWithItemCounter(browserType) {
    var _config = _BrowserConfig2.default[browserType];
    if (typeof _config === 'undefined') {
      return false;
    } else {
      return !_config.withoutItemCounter;
    }
    //return !BrowserConfig[browserType].withoutItemCounter;
  },
  setMenuItemOpen: function setMenuItemOpen(chartType, browserType) {
    if (this.isWithItemCounter(browserType)) {
      fnSetIsOpen(chartType, this.browserMenu, browserType, true);
    }
  },
  setMenuItemClose: function setMenuItemClose(chartType, browserType) {
    if (this.isWithItemCounter(browserType)) {
      fnSetIsOpen(chartType, this.browserMenu, browserType, false);
    }
  },
  addMenuItemCounter: function addMenuItemCounter(chartType, browserType) {
    if (this.isWithItemCounter(browserType)) {
      fnAddCounter(chartType, browserType, this.browserMenu, 1);
    }
  },
  minusMenuItemCounter: function minusMenuItemCounter(chartType, browserType) {
    if (this.isWithItemCounter(browserType)) {
      fnAddCounter(chartType, browserType, this.browserMenu, -1);
    }
  },
  getSourceConfig: function getSourceConfig(browserId, sourceId) {
    if (sourceId.indexOf(_Type.BrowserType.STOCKS_BY_SECTORS) > 0) {
      return _BrowserConfig2.default[browserId];
    }
    var _r = this.routeDialog[browserId];
    return _r ? _r[sourceId] : undefined;
  },
  onShowBrowser: function onShowBrowser(browserType) {
    this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER, browserType);
  },
  onShowBrowserDynamicCompleted: function onShowBrowserDynamicCompleted(option) {
    var _this = this;

    var browserType = option.browserType;

    if (!this.browserMenu[browserType]) {
      _Factory2.default.crAsyncBrowser(option).then(function (elBrowser) {
        _this.browserMenu[browserType] = [];
        _this.trigger(_BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC, elBrowser);
      }).catch(function (err) {
        //this.showAlertDialog(option);
        console.log(err);
      });
    } else {
      this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC, browserType);
    }
  },
  onShowBrowserDynamicFailed: function onShowBrowserDynamicFailed(option) {
    this.showAlertDialog(option);
    this.trigger(_BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC + C.FAILED);
  },
  onLoadBrowserDynamicCompleted: function onLoadBrowserDynamicCompleted(option) {
    var json = option.json,
        browserType = option.browserType;

    if (this.isWithItemCounter(browserType)) {
      var menu = json.menu,
          items = json.items,
          elMenu = _BrowserMenu2.default.createMenu(menu, items, browserType);

      _addDialogProps(items);

      this.routeDialog[browserType] = items;
      this.browserMenu[browserType] = elMenu;
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\BrowserSlice.js.map