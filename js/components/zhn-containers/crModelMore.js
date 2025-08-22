"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _menuModelFn = require("../menuModelFn");
const P0 = [(0, _menuModelFn.crSubItem)('p1', 'Items'), (0, _menuModelFn.crSubItem)('p2', 'Sort By, ASC'), (0, _menuModelFn.crSubItem)('p3', 'Resize')];
const crModelMore = (isAdminMode, _ref) => {
  let {
    onMinWidth,
    onInitWidth,
    onPlusWidth,
    onMinusWidth,
    onFit,
    onShowCaptions,
    onRemoveAll,
    onSortBy,
    onCompareTo
  } = _ref;
  const p1 = [(0, _menuModelFn.crItem)('Remove All', onRemoveAll), (0, _menuModelFn.crItem)('Show Caption', onShowCaptions, !1)];
  if (isAdminMode) {
    p1.push((0, _menuModelFn.crItem)('CompareTo', onCompareTo));
  }
  return (0, _menuModelFn.crSliderMenu)(170, {
    p0: P0,
    p1: p1,
    p2: [(0, _menuModelFn.crItem)('Value', (0, _uiApi.bindTo)(onSortBy, '_value')), (0, _menuModelFn.crItem)('Percent', (0, _uiApi.bindTo)(onSortBy, '_percentAbs')), (0, _menuModelFn.crItem)('Delta', (0, _uiApi.bindTo)(onSortBy, '_deltaAbs')), (0, _menuModelFn.crItem)('Reverse', onSortBy)],
    p3: [(0, _menuModelFn.crItem)('to MinWidth', onMinWidth, !1), (0, _menuModelFn.crItem)('to InitialWidth', onInitWidth, !1), (0, _menuModelFn.crItem)('+10px to Width', onPlusWidth, !1), (0, _menuModelFn.crItem)('-10px to Width', onMinusWidth, !1), (0, _menuModelFn.crItem)('Fit Items to Width', onFit, !1)]
  }, 2);
};
var _default = exports.default = crModelMore;
//# sourceMappingURL=crModelMore.js.map