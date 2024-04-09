"use strict";

exports.__esModule = true;
exports.crTreeMapSeria = exports.crTreeMapConfig = exports.CONFIG_TREE_MAP = void 0;
var _ChartFn = require("./ChartFn");
var _Chart = require("./Chart");
var _Tooltip = require("./Tooltip");
const CONFIG_TREE_MAP = exports.CONFIG_TREE_MAP = {
  //data : data,
  type: 'treemap',
  layoutAlgorithm: 'squarified',
  //layoutAlgorithm : 'sliceAndDice',
  borderColor: 'grey',
  dataLabels: {
    align: 'left',
    verticalAlign: 'top',
    style: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: (0, _ChartFn.getColorBlack)(),
      textShadow: 'none'
    }
  },
  states: {
    hover: {
      borderColor: 'yellow',
      brightness: 0
    }
  }
};
const crTreeMapConfig = () => ({
  credits: (0, _Chart.fCreditsRightBottom)(),
  chart: {
    type: 'treemap',
    spacingTop: 25,
    marginTop: 50,
    marginRight: 5,
    height: 500
  },
  title: (0, _Chart.fTitle)(),
  subtitle: (0, _Chart.fSubtitle)(),
  tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipSparkTreeMap),
  zhSeries: {
    count: 0
  },
  zhDetailCharts: []
});
exports.crTreeMapConfig = crTreeMapConfig;
const crTreeMapSeria = data => ({
  ...CONFIG_TREE_MAP,
  data
});
exports.crTreeMapSeria = crTreeMapSeria;
//# sourceMappingURL=TreeMapConfigFn.js.map