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
const initBrowserMenu = (setBrowserMenu, setRouterDialog, option) => {
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
  setRouterDialog(browserType, items);
  setBrowserMenu(browserType, elMenu);
  return elMenu;
};
exports.initBrowserMenu = initBrowserMenu;
const _findItemSetValue = (appMenu, bT, cT) => isWithItemCounter(bT) ? (0, _findItem.default)(appMenu[bT], cT) : void 0;
const _fEditItem = edit => (value, appMenu, bT, cT) => {
  const setValue = _findItemSetValue(appMenu, bT, cT);
  if (setValue) {
    edit(setValue, value);
  }
};
const _editIsOpen = (setValue, value) => {
  setValue(prev => ({
    ...prev,
    is: value
  }));
};
const setIsOpen = exports.setIsOpen = _fEditItem(_editIsOpen);
const _editPlusCounter = (setValue, value) => {
  setValue(prev => ({
    value: prev.value + value,
    is: true
  }));
};
const plusCounter = exports.plusCounter = _fEditItem(_editPlusCounter);
const _editResetCounter = (setValue, value) => {
  setValue(prev => ({
    ...prev,
    value
  }));
};
const resetCounter = exports.resetCounter = _fEditItem(_editResetCounter).bind(null, 0);
//# sourceMappingURL=BrowserLogicFn.js.map