'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithTreeMap = {
  fBaseTreeMapConfig: function fBaseTreeMapConfig() {
    return {

      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],

      credits: _Chart2.default.fCreditsRightBottom(),
      chart: {
        type: 'treemap',
        marginTop: _Chart2.default.MARGIN_TOP
      },
      title: _Chart2.default.fTitle({ y: 10 }),
      subtitle: _Chart2.default.fSubtitle({ y: 30, style: { fontWeight: 'bold' } }),
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnTreeMapPointFormatter)
    };
  },
  fCreateTreeMapSeria: function fCreateTreeMapSeria(zhSeriaId, data) {
    return {
      zhSeriaId: zhSeriaId,
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
          //fontWeight: 'normal',
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

exports.default = WithTreeMap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\WithTreeMap.js.map