"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _BrowserConfig = _interopRequireDefault(require("../../../constants/BrowserConfig"));

var _crMenu = _interopRequireDefault(require("./crMenu"));

var _addDialogPropsTo = _interopRequireDefault(require("./addDialogPropsTo"));

var _findItem = _interopRequireDefault(require("./findItem"));

const _findItemCounter = (appMenu, bT, cT) => BrowserLogic.isWithItemCounter(bT) ? (0, _findItem.default)(appMenu[bT], cT) : void 0;

const BrowserLogic = {
  crMenu: _crMenu.default,
  isWithItemCounter: browserType => {
    const _config = _BrowserConfig.default[browserType];
    return typeof _config === 'undefined' ? false : !_config.withoutItemCounter;
  },
  initBrowserMenu: (slice, option) => {
    const {
      json,
      browserType
    } = option,
          {
      menu,
      items,
      df
    } = json,
          elMenu = (0, _crMenu.default)(menu, items, browserType);
    (0, _addDialogPropsTo.default)(items, df);
    slice.routeDialog[browserType] = items;
    slice.browserMenu[browserType] = elMenu;
    return elMenu;
  },
  setIsOpen: (value, appMenu, bT, cT) => {
    if (BrowserLogic.isWithItemCounter(bT)) {
      const item = (0, _findItem.default)(appMenu[bT], cT);

      if (item) {
        item.isOpen = value;
      }
    }
  },
  plusCounter: (value, appMenu, bT, cT) => {
    const item = _findItemCounter(appMenu, bT, cT);

    if (item) {
      item.counter += value;
      item.isOpen = true;
    }
  },
  resetCounter: (appMenu, bT, cT) => {
    const item = _findItemCounter(appMenu, bT, cT);

    if (item) {
      item.counter = 0;
    }
  }
};
var _default = BrowserLogic;
exports.default = _default;
//# sourceMappingURL=BrowserLogic.js.map