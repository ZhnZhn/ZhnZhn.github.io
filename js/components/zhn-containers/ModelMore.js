"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var CL_ROW = 'row__pane-topic not-selected';

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
  var p0 = [{
    id: 'p1',
    type: 'sub',
    cn: CL_ROW,
    name: 'Resize'
  }, {
    id: 'p2',
    type: 'sub',
    cn: CL_ROW,
    name: 'Sort By, ASC'
  }, {
    cn: CL_ROW,
    name: 'Show Captions',
    onClick: onShowCaptions
  }, {
    cn: CL_ROW,
    name: 'Remove All Items',
    onClick: onRemoveAll,
    isClose: true
  }];

  if (isAdminMode) {
    p0.push({
      cn: CL_ROW,
      name: 'CompareTo',
      onClick: onCompareTo,
      isClose: true
    });
  }

  return {
    baseTitleCl: CL_ROW,
    pageWidth: 180,
    maxPages: 2,
    p0: p0,
    p1: [{
      cn: CL_ROW,
      name: 'to MinWidth',
      onClick: onMinWidth
    }, {
      cn: CL_ROW,
      name: 'to InitWidth',
      onClick: onInitWidth
    }, {
      cn: CL_ROW,
      name: '+10px to Width',
      onClick: onPlusWidth
    }, {
      cn: CL_ROW,
      name: '-10px to Width',
      onClick: onMinusWidth
    }, {
      cn: CL_ROW,
      name: 'Fit Items to Width',
      onClick: onFit
    }],
    p2: [{
      cn: CL_ROW,
      name: 'Value',
      onClick: onSortBy.bind(null, '_value'),
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Percent',
      onClick: onSortBy.bind(null, '_percentAbs'),
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Delta',
      onClick: onSortBy.bind(null, '_deltaAbs'),
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Reverse',
      onClick: onSortBy,
      isClose: true
    }]
  };
};

var _default = crModelMore;
exports["default"] = _default;
//# sourceMappingURL=ModelMore.js.map