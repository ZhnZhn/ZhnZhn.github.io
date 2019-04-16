'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowOcSelect = require('./RowOcSelect');

var _RowOcSelect2 = _interopRequireDefault(_RowOcSelect);

var _SeriaColor = require('../SeriaColor');

var _SeriaColor2 = _interopRequireDefault(_SeriaColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowChart = function RowChart(_ref) {
  var isShowLabels = _ref.isShowLabels,
      placeholder = _ref.placeholder,
      options = _ref.options,
      onSelectChart = _ref.onSelectChart,
      onRegColor = _ref.onRegColor;
  return _react2.default.createElement(
    _RowOcSelect2.default,
    {
      isShowLabels: isShowLabels,
      caption: 'Chart',
      placeholder: placeholder || options[0].caption,
      options: options,
      onSelect: onSelectChart
    },
    _react2.default.createElement(_SeriaColor2.default, {
      isLong: isShowLabels,
      onReg: onRegColor
    })
  );
};

exports.default = RowChart;
//# sourceMappingURL=RowChart.js.map