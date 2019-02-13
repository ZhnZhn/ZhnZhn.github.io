'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _BrowserMenu = require('../../constants/BrowserMenu');

var _BrowserMenu2 = _interopRequireDefault(_BrowserMenu);

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _Type = require('../../constants/Type');

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _BrowserActions = require('../actions/BrowserActions');

var _DataWL = require('../../constants/DataWL');

var _DataWL2 = _interopRequireDefault(_DataWL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  FAILED: 'Failed'
};

var _isArray = Array.isArray;

var _findItem = function _findItem(menu, chartType) {
  if (!_isArray(menu)) {
    return;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = menu[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var topics = _step.value;

      var items = topics.items;
      if (_isArray(items)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            if (item.id === chartType) {
              return item;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var _setIsOpen = function _setIsOpen(value, menu, chartType) {
  var item = _findItem(menu, chartType);
  if (item) {
    item.isOpen = value;
  }
},
    _setItemOpen = _setIsOpen.bind(null, true),
    _setItemClose = _setIsOpen.bind(null, false);

var _plusCounter = function _plusCounter(value, menu, chartType) {
  var item = _findItem(menu, chartType);
  if (item) {
    item.counter += value;
    item.isOpen = true;
  }
},
    _addCounter = _plusCounter.bind(null, 1),
    _minusCounter = _plusCounter.bind(null, -1);

var _crSelectProps = function _crSelectProps(selectProps, obj) {
  var arr = [].concat((0, _toConsumableArray3.default)(selectProps), (0, _toConsumableArray3.default)(obj.selectProps || []));
  return arr.length > 0 ? { selectProps: arr } : undefined;
};

var _addDialogProps = function _addDialogProps(items) {
  Object.keys(items).forEach(function (propName) {
    var item = items[propName],
        addProps = item.addProps;
    if (addProps !== undefined) {
      var dialogProps = item.dialogProps,
          baseProps = items[addProps].dialogProps,
          selectProps = baseProps.selectProps,
          _selectProps = _isArray(selectProps) ? _crSelectProps(selectProps, dialogProps) : undefined;

      item.dialogProps = Object.assign({}, baseProps, dialogProps, _selectProps);
    }
  });
};

var BrowserSlice = {
  browserMenu: _BrowserMenu2.default,
  routeDialog: {
    WL: _DataWL2.default
  },

  getBrowserMenu: function getBrowserMenu(browserType) {
    return this.browserMenu[browserType];
  },
  isWithItemCounter: function isWithItemCounter(browserType) {
    var _config = _BrowserConfig2.default[browserType];
    return typeof _config === 'undefined' ? false : !_config.withoutItemCounter;
  },
  setMenuItemOpen: function setMenuItemOpen(cT, bT) {
    if (this.isWithItemCounter(bT)) {
      _setItemOpen(this.getBrowserMenu(bT), cT);
    }
  },
  setMenuItemClose: function setMenuItemClose(cT, bT) {
    if (this.isWithItemCounter(bT)) {
      _setItemClose(this.getBrowserMenu(bT), cT);
    }
  },
  addMenuItemCounter: function addMenuItemCounter(cT, bT) {
    if (this.isWithItemCounter(bT)) {
      _addCounter(this.getBrowserMenu(bT), cT);
    }
  },
  minusMenuItemCounter: function minusMenuItemCounter(cT, bT) {
    if (this.isWithItemCounter(bT)) {
      _minusCounter(this.getBrowserMenu(bT), cT);
    }
  },
  getSourceConfig: function getSourceConfig(browserId, sourceId) {
    if (sourceId.indexOf(_Type.BrowserType.STOCKS_BY_SECTORS) > 0) {
      return _BrowserConfig2.default[browserId];
    }
    var _r = this.routeDialog[browserId];
    return _r ? _r[sourceId] : undefined;
  },
  onShowBrowserDynamicCompleted: function onShowBrowserDynamicCompleted(option) {
    var _this = this;

    var browserType = option.browserType;

    if (!this.getBrowserMenu(browserType)) {
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
        menuItems: elMenu,
        browserType: browserType
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