"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var WithTreeMapConfig = {
  fBaseTreeMapConfig: function fBaseTreeMapConfig() {
    return {
      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],
      credits: _Chart["default"].fCreditsRightBottom(),
      chart: {
        type: 'treemap',
        marginTop: _Chart["default"].TREEMAP_MARGIN_TOP
      },
      title: _Chart["default"].fTitle({
        y: _Chart["default"].TREEMAP_TITLE_Y
      }),
      subtitle: _Chart["default"].fSubtitle({
        y: _Chart["default"].TREEMAP_SUBTITLE_Y
      }),
      tooltip: _Chart["default"].fTooltip(_Tooltip["default"].sparkTreeMap),
      navigation: _Chart["default"].fNavigation()
    };
  },
  fCreateTreeMapSeria: function fCreateTreeMapSeria(data) {
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