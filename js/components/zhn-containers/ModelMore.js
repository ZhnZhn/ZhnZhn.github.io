"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var CL_ROW = 'row__pane-topic not-selected';

var _crSubItem = function _crSubItem(id, name) {
  return {
    type: 'sub',
    id: id,
    name: name //cn

  };
};

var _crItem = function _crItem(name, onClick, isClose) {
  if (isClose === void 0) {
    isClose = true;
  }

  return {
    name: name,
    onClick: onClick,
    isClose: isClose //cn

  };
};

var P0 = [_crSubItem('p1', 'Items'), _crSubItem('p2', 'Sort By, ASC'), _crSubItem('p3', 'Resize')];

var crModelMore = function crModelMore(_ref) {
  var onMinWidth = _ref.onMinWidth,
      onInitWidth = _ref.onInitWidth,
      onPlusWidth = _ref.onPlusWidth,
      onMinusWidth = _ref.onMinusWidth,
      onFit = _ref.onFit,
      onShowCaptions = _ref.onShowCaptions,
      onRemoveAll = _ref.onRemoveAll,
      onSortBy = _ref.onSortBy,
      isAdminMode = _ref.isAdminMode,
      onCompareTo = _ref.onCompareTo;
  var p1 = [_crItem('Remove All', onRemoveAll), _crItem('Show Caption', onShowCaptions, false)];

  if (isAdminMode) {
    p1.push(_crItem('CompareTo', onCompareTo));
  }

  return {
    baseTitleCl: CL_ROW,
    pageWidth: 180,
    maxPages: 2,
    p0: P0,
    p1: p1,
    p2: [_crItem('Value', onSortBy.bind(null, '_value')), _crItem('Percent', onSortBy.bind(null, '_percentAbs')), _crItem('Delta', onSortBy.bind(null, '_deltaAbs')), _crItem('Reverse', onSortBy)],
    p3: [_crItem('to MinWidth', onMinWidth, false), _crItem('to InitialWidth', onInitWidth, false), _crItem('+10px to Width', onPlusWidth, false), _crItem('-10px to Width', onMinusWidth, false), _crItem('Fit Items to Width', onFit, false)]
  };
};

var _default = crModelMore;
exports["default"] = _default;
//# sourceMappingURL=ModelMore.js.map