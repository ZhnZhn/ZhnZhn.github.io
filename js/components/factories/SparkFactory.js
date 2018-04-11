'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Sparklines = require('../zhn-sparklines/Sparklines');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C_YELLOW = _Color2.default.YELLOW;

var S = {
  REF_LINE: {
    stroke: 'red',
    strokeOpacity: .75,
    strokeDasharray: '5, 3'
  },
  BARS: {
    stroke: "black",
    strokeWidth: "1",
    fill: C_YELLOW,
    fillOpacity: "0.9"
  }
};

var SparkFactory = {
  createSparklines: function createSparklines(data, pointIndex) {
    return _react2.default.createElement(
      _Sparklines.Sparklines,
      {
        height: 45,
        width: 100,
        svgHeight: 45,
        svgWidth: 100,
        data: data
      },
      _react2.default.createElement(_Sparklines.SparklinesLine, { color: C_YELLOW }),
      _react2.default.createElement(_Sparklines.SparklinesReferenceLine, {
        style: S.REF_LINE,
        type: 'avg'
      }),
      _react2.default.createElement(_Sparklines.SparklinesSpots, null),
      _react2.default.createElement(_Sparklines.SparklinesSpot, { pointIndex: pointIndex })
    );
  },
  createSparkbars: function createSparkbars(data, pointIndex) {
    return _react2.default.createElement(
      _Sparklines.Sparklines,
      {
        height: 45,
        width: 100,
        svgHeight: 45,
        svgWidth: 100,
        data: data,
        min: 0,
        max: 100
      },
      _react2.default.createElement(_Sparklines.SparklinesBars, {
        style: S.BARS,
        pointIndex: pointIndex
      })
    );
  }
};

exports.default = SparkFactory;
//# sourceMappingURL=SparkFactory.js.map