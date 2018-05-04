'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartActions = require('../../flux/actions/ChartActions');

var _ChartActions2 = _interopRequireDefault(_ChartActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL_ROW = 'row__pane-topic not-selected';

var sortBy = _ChartActions2.default.sortBy;


var crModelMore = function crModelMore(_ref) {
  var chartType = _ref.chartType,
      onMinWidth = _ref.onMinWidth,
      onInitWidth = _ref.onInitWidth,
      onPlusWidth = _ref.onPlusWidth,
      onMinusWidth = _ref.onMinusWidth,
      onFit = _ref.onFit;

  return {
    baseTitleCl: CL_ROW,
    p0: [{
      id: 'p1',
      type: 'sub',
      cn: CL_ROW,
      name: 'Resize'
    }, {
      id: 'p2',
      type: 'sub',
      cn: CL_ROW,
      name: 'Sort By, ASC'
    }],
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
      onClick: sortBy.bind(null, chartType, '_value'),
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Abs Delta',
      onClick: sortBy.bind(null, chartType, '_deltaAbs'),
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Abs Percent',
      onClick: sortBy.bind(null, chartType, '_percentAbs'),
      isClose: true
    }, {
      cn: CL_ROW,
      name: 'Reverse',
      onClick: sortBy.bind(null, chartType),
      isClose: true
    }]
  };
};

exports.default = crModelMore;
//# sourceMappingURL=ModelMore.js.map