"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _BrowserConfig = _interopRequireDefault(require("../../../constants/BrowserConfig"));

var _crMenu = _interopRequireDefault(require("./crMenu"));

var _addDialogPropsTo = _interopRequireDefault(require("./addDialogPropsTo"));

var _findItem = _interopRequireDefault(require("./findItem"));

var _findItemCounter = function _findItemCounter(appMenu, bT, cT) {
  return BrowserLogic.isWithItemCounter(bT) ? (0, _findItem["default"])(appMenu[bT], cT) : void 0;
};

var BrowserLogic = {
  crMenu: _crMenu["default"],
  isWithItemCounter: function isWithItemCounter(browserType) {
    var _config = _BrowserConfig["default"][browserType];
    return typeof _config === 'undefined' ? false : !_config.withoutItemCounter;
  },
  initBrowserMenu: function initBrowserMenu(slice, option) {
    var json = option.json,
        browserType = option.browserType,
        menu = json.menu,
        items = json.items,
        elMenu = (0, _crMenu["default"])(menu, items, browserType);
    (0, _addDialogPropsTo["default"])(items);
    slice.routeDialog[browserType] = items;
    slice.browserMenu[browserType] = elMenu;
    return elMenu;
  },
  setIsOpen: function setIsOpen(value, appMenu, bT, cT) {
    if (BrowserLogic.isWithItemCounter(bT)) {
      var item = (0, _findItem["default"])(appMenu[bT], cT);

      if (item) {
        item.isOpen = value;
      }
    }
  },
  plusCounter: function plusCounter(value, appMenu, bT, cT) {
    var item = _findItemCounter(appMenu, bT, cT);

    if (item) {
      item.counter += value;
      item.isOpen = true;
    }
  },
  resetCounter: function resetCounter(appMenu, bT, cT) {
    var item = _findItemCounter(appMenu, bT, cT);

    if (item) {
      item.counter = 0;
    }
  }
};
var _default = BrowserLogic;
exports["default"] = _default;
//# sourceMappingURL=BrowserLogic.js.map