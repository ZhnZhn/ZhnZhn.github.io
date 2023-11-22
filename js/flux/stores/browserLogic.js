"use strict";

exports.__esModule = true;
exports.setMenuItemOpen = exports.setMenuItemClose = exports.setBrowserMenu = exports.resetMenuItemCounter = exports.minusMenuItemCounter = exports.getBrowserMenu = exports.addMenuItemCounter = void 0;
var _storeApi = require("../storeApi");
var _BrowserLogicFn = require("./browser/BrowserLogicFn");
const BROWSER_MENU = {};
const _setItemOpen = (0, _storeApi.bindTo)(_BrowserLogicFn.setIsOpen, true),
  _setItemClose = (0, _storeApi.bindTo)(_BrowserLogicFn.setIsOpen, false),
  _addCounter = (0, _storeApi.bindTo)(_BrowserLogicFn.plusCounter, 1),
  _minusCounter = (0, _storeApi.bindTo)(_BrowserLogicFn.plusCounter, -1);
const getBrowserMenu = browserType => BROWSER_MENU[browserType];
exports.getBrowserMenu = getBrowserMenu;
const setBrowserMenu = (browserType, menu) => {
  BROWSER_MENU[browserType] = menu;
};
exports.setBrowserMenu = setBrowserMenu;
const setMenuItemOpen = (cT, bT) => {
  _setItemOpen(BROWSER_MENU, bT, cT);
};
exports.setMenuItemOpen = setMenuItemOpen;
const setMenuItemClose = (cT, bT) => {
  _setItemClose(BROWSER_MENU, bT, cT);
};
exports.setMenuItemClose = setMenuItemClose;
const addMenuItemCounter = (cT, bT) => {
  _addCounter(BROWSER_MENU, bT, cT);
};
exports.addMenuItemCounter = addMenuItemCounter;
const minusMenuItemCounter = (cT, bT) => {
  _minusCounter(BROWSER_MENU, bT, cT);
};
exports.minusMenuItemCounter = minusMenuItemCounter;
const resetMenuItemCounter = (cT, bT) => {
  (0, _BrowserLogicFn.resetCounter)(BROWSER_MENU, bT, cT);
};
exports.resetMenuItemCounter = resetMenuItemCounter;
//# sourceMappingURL=browserLogic.js.map