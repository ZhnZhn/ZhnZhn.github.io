"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.setIsOpen = exports.resetCounter = exports.plusCounter = void 0;
var _isWithItemCounter = _interopRequireDefault(require("./isWithItemCounter"));
var _findItem = _interopRequireDefault(require("./findItem"));
const _findItemSetValue = (appMenu, bT, cT) => (0, _isWithItemCounter.default)(bT) ? (0, _findItem.default)(appMenu[bT], cT) : void 0;
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