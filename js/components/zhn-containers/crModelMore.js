"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
const _crSubItem = (id, name) => ({
  type: 'sub',
  id,
  name
  //cn
});
const _crItem = function (name, onClick, isClose) {
  if (isClose === void 0) {
    isClose = true;
  }
  return {
    name,
    onClick,
    isClose
    //cn
  };
};
const P0 = [_crSubItem('p1', 'Items'), _crSubItem('p2', 'Sort By, ASC'), _crSubItem('p3', 'Resize')];
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
  const p1 = [_crItem('Remove All', onRemoveAll), _crItem('Show Caption', onShowCaptions, false)];
  if (isAdminMode) {
    p1.push(_crItem('CompareTo', onCompareTo));
  }
  return {
    titleCl: _styleFn.CL_ROW_PANE_TOPIC,
    pageWidth: 180,
    maxPages: 2,
    p0: P0,
    p1: p1,
    p2: [_crItem('Value', (0, _uiApi.bindTo)(onSortBy, '_value')), _crItem('Percent', (0, _uiApi.bindTo)(onSortBy, '_percentAbs')), _crItem('Delta', (0, _uiApi.bindTo)(onSortBy, '_deltaAbs')), _crItem('Reverse', onSortBy)],
    p3: [_crItem('to MinWidth', onMinWidth, false), _crItem('to InitialWidth', onInitWidth, false), _crItem('+10px to Width', onPlusWidth, false), _crItem('-10px to Width', onMinusWidth, false), _crItem('Fit Items to Width', onFit, false)]
  };
};
var _default = exports.default = crModelMore;
//# sourceMappingURL=crModelMore.js.map