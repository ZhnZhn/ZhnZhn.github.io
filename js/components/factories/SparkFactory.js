'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Sparklines = require('../zhnSparklines/Sparklines');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
         _react2.default.createElement(_Sparklines.SparklinesLine, { color: 'yellow' }),
         _react2.default.createElement(_Sparklines.SparklinesReferenceLine, {
            style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '5, 3' },
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
            style: { stroke: "black", strokeWidth: "1", fill: "yellow", fillOpacity: "0.9" },
            pointIndex: pointIndex
         })
      );
   }
};

exports.default = SparkFactory;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\factories\SparkFactory.js.map