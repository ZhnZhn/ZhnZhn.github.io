"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crTreeMapSeria = exports.crTreeMapConfig = exports.CONFIG_TREE_MAP = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = require("./Tooltip");

const CONFIG_TREE_MAP = {
  //data : data,
  type: 'treemap',
  layoutAlgorithm: 'squarified',
  //layoutAlgorithm : 'sliceAndDice',
  borderColor: 'gray',
  dataLabels: {
    align: 'left',
    verticalAlign: 'top',
    style: {
      fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'black',
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
exports.CONFIG_TREE_MAP = CONFIG_TREE_MAP;

const crTreeMapConfig = () => ({
  credits: _Chart.default.fCreditsRightBottom(),
  chart: {
    type: 'treemap',
    spacingTop: 25,
    marginTop: 50,
    marginRight: 5,
    height: 500
  },
  title: _Chart.default.fTitle(),
  subtitle: _Chart.default.fSubtitle(),
  tooltip: _Chart.default.fTooltip(_Tooltip.tooltipSparkTreeMap),
  zhSeries: {
    count: 0
  },
  zhDetailCharts: []
});

exports.crTreeMapConfig = crTreeMapConfig;

const crTreeMapSeria = data => ({ ...CONFIG_TREE_MAP,
  data
});

exports.crTreeMapSeria = crTreeMapSeria;
//# sourceMappingURL=TreeMapConfigFn.js.map