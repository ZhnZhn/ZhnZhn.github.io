'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BrowserConfig = require('../../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _crMenu = require('./crMenu');

var _crMenu2 = _interopRequireDefault(_crMenu);

var _addDialogPropsTo = require('./addDialogPropsTo');

var _addDialogPropsTo2 = _interopRequireDefault(_addDialogPropsTo);

var _findItem = require('./findItem');

var _findItem2 = _interopRequireDefault(_findItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserLogic = {
  crMenu: _crMenu2.default,

  isWithItemCounter: function isWithItemCounter(browserType) {
    var _config = _BrowserConfig2.default[browserType];
    return typeof _config === 'undefined' ? false : !_config.withoutItemCounter;
  },

  initBrowseMenu: function initBrowseMenu(slice, option) {
    var json = option.json,
        browserType = option.browserType,
        menu = json.menu,
        items = json.items,
        elMenu = (0, _crMenu2.default)(menu, items, browserType);

    (0, _addDialogPropsTo2.default)(items);
    slice.routeDialog[browserType] = items;
    slice.browserMenu[browserType] = elMenu;
    return elMenu;
  },

  setIsOpen: function setIsOpen(value, appMenu, bT, cT) {
    if (BrowserLogic.isWithItemCounter(bT)) {
      var item = (0, _findItem2.default)(appMenu[bT], cT);
      if (item) {
        item.isOpen = value;
      }
    }
  },
  plusCounter: function plusCounter(value, appMenu, bT, cT) {
    if (BrowserLogic.isWithItemCounter(bT)) {
      var item = (0, _findItem2.default)(appMenu[bT], cT);
      if (item) {
        item.counter += value;
        item.isOpen = true;
      }
    }
  }
};

exports.default = BrowserLogic;
//# sourceMappingURL=BrowserLogic.js.map