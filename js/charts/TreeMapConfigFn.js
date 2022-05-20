"use strict";

exports.__esModule = true;
exports.crTreeMapSeria = exports.crTreeMapConfig = exports.CONFIG_TREE_MAP = void 0;

var _Chart = require("./Chart");

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

const crTreeMapSeria = data => ({ ...CONFIG_TREE_MAP,
  data
});

exports.crTreeMapSeria = crTreeMapSeria;
//# sourceMappingURL=TreeMapConfigFn.js.map