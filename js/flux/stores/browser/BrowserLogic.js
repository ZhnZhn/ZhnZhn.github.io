"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setIsOpen = exports.resetCounter = exports.plusCounter = exports.isWithItemCounter = exports.initBrowserMenu = void 0;

var _BrowserConfig = _interopRequireDefault(require("../../../constants/BrowserConfig"));

var _crMenu = _interopRequireDefault(require("./crMenu"));

var _addDialogPropsTo = _interopRequireDefault(require("./addDialogPropsTo"));

var _findItem = _interopRequireDefault(require("./findItem"));

const isWithItemCounter = browserType => {
  const _config = _BrowserConfig.default[browserType];
  return typeof _config === 'undefined' ? false : !_config.withoutItemCounter;
};

exports.isWithItemCounter = isWithItemCounter;

const initBrowserMenu = (slice, option) => {
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
};

exports.initBrowserMenu = initBrowserMenu;

const setIsOpen = (value, appMenu, bT, cT) => {
  if (isWithItemCounter(bT)) {
    const item = (0, _findItem.default)(appMenu[bT], cT);

    if (item) {
      item.isOpen = value;
    }
  }
};

exports.setIsOpen = setIsOpen;

const _findItemCounter = (appMenu, bT, cT) => isWithItemCounter(bT) ? (0, _findItem.default)(appMenu[bT], cT) : void 0;

const plusCounter = (value, appMenu, bT, cT) => {
  const item = _findItemCounter(appMenu, bT, cT);

  if (item) {
    item.counter += value;
    item.isOpen = true;
  }
};

exports.plusCounter = plusCounter;

const resetCounter = (appMenu, bT, cT) => {
  const item = _findItemCounter(appMenu, bT, cT);

  if (item) {
    item.counter = 0;
  }
};

exports.resetCounter = resetCounter;
//# sourceMappingURL=BrowserLogic.js.map