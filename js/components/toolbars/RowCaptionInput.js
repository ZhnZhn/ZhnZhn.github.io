'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _A = require('../zhn/A');

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 48,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 56,
    marginRight: 12
  }
};

var RowCaptionInput = function RowCaptionInput(_ref) {
  var caption = _ref.caption,
      forwardRef = _ref.forwardRef,
      initValue = _ref.initValue,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === undefined ? 3 : _ref$maxLength,
      onAdd = _ref.onAdd;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'span',
      { style: S.CAPTION },
      caption
    ),
    _react2.default.createElement(_A2.default.InputText, {
      ref: forwardRef,
      type: 'number',
      style: S.INPUT_TEXT,
      initValue: initValue,
      maxLength: maxLength,
      onEnter: onAdd
    }),
    _react2.default.createElement(_A2.default.SvgPlus, { onClick: onAdd })
  );
};

exports.default = RowCaptionInput;
//# sourceMappingURL=RowCaptionInput.js.map