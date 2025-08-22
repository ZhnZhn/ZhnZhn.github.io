"use strict";

exports.__esModule = true;
exports.crSubItem = exports.crSliderMenu = exports.crItem = exports.addToggleTo = void 0;
var _styleFn = require("./styleFn");
const crSubItem = (id, name, cn) => ({
  type: 'sub',
  id,
  name,
  cn
});
exports.crSubItem = crSubItem;
const crItem = function (name, onClick, isClose, cn) {
  if (isClose === void 0) {
    isClose = !0;
  }
  return {
    name,
    onClick,
    isClose,
    cn
  };
};
exports.crItem = crItem;
const addToggleTo = (item, isInitial) => (item.isInitial = !!isInitial, item);
exports.addToggleTo = addToggleTo;
const crSliderMenu = function (pageWidth, items, maxPages, titleCl) {
  if (maxPages === void 0) {
    maxPages = 1;
  }
  if (titleCl === void 0) {
    titleCl = _styleFn.CL_ROW_PANE_TOPIC;
  }
  return {
    ...items,
    titleCl,
    pageWidth,
    maxPages
  };
};
exports.crSliderMenu = crSliderMenu;
//# sourceMappingURL=menuModelFn.js.map