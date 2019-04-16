'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _useRowOptions2 = require('./useRowOptions');

var _useRowOptions3 = _interopRequireDefault(_useRowOptions2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowInputSelect = function RowInputSelect(props) {
  var _useRowOptions = (0, _useRowOptions3.default)(props),
      rowStyle = _useRowOptions.rowStyle,
      labelStyle = _useRowOptions.labelStyle,
      caption = _useRowOptions.caption,
      options = _useRowOptions.options;

  return _react2.default.createElement(
    'div',
    { style: rowStyle },
    _react2.default.createElement(
      'span',
      { style: labelStyle },
      caption
    ),
    _react2.default.createElement(_InputSelect2.default, options)
  );
};

exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map