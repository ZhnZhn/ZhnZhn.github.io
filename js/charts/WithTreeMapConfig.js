"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var WithTreeMapConfig = {
  crTreeMapConfig: function crTreeMapConfig() {
    return {
      credits: _Chart["default"].fCreditsRightBottom(),
      chart: {
        type: 'treemap',
        spacingTop: 25,
        marginTop: 50,
        marginRight: 5,
        height: 500
      },
      title: _Chart["default"].fTitle(),
      subtitle: _Chart["default"].fSubtitle(),
      tooltip: _Chart["default"].fTooltip(_Tooltip["default"].sparkTreeMap),
      zhSeries: {
        count: 0
      },
      zhDetailCharts: []
    };
  },
  crTreeMapSeria: function crTreeMapSeria(data) {
    return {
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
      data: data,
      states: {
        hover: {
          borderColor: 'yellow',
          brightness: 0
        }
      }
    };
  }
};
var _default = WithTreeMapConfig;
exports["default"] = _default;
//# sourceMappingURL=WithTreeMapConfig.js.map