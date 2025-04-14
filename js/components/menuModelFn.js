"use strict";

exports.__esModule = true;
exports.crSubItem = exports.crSliderMenu = exports.crItem = exports.addToggleTo = void 0;
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
const crSliderMenu = (titleCl, pageWidth, maxPages, items) => ({
  ...items,
  titleCl,
  pageWidth,
  maxPages
});
exports.crSliderMenu = crSliderMenu;
//# sourceMappingURL=menuModelFn.js.map