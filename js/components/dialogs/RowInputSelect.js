'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowInputSelect = function RowInputSelect(_ref) {
  var _ref$isShowLabels = _ref.isShowLabels,
      isShowLabels = _ref$isShowLabels === undefined ? true : _ref$isShowLabels,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? '' : _ref$caption,
      captionStyle = _ref.captionStyle,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['isShowLabels', 'caption', 'captionStyle']);
  var _caption = caption.indexOf(':') === -1 && caption !== '' ? caption + ':' : caption,
      _STYLE$crRowLabelStyl = _DialogStyles2.default.crRowLabelStyle(isShowLabels),
      rowStyle = _STYLE$crRowLabelStyl.rowStyle,
      labelStyle = _STYLE$crRowLabelStyl.labelStyle,
      optionName = isShowLabels ? '' : caption.replace(':', ''),
      _options = (0, _extends3.default)({ width: "250" }, rest, { optionName: optionName });

  return _react2.default.createElement(
    'div',
    { style: rowStyle },
    _react2.default.createElement(
      'span',
      { style: (0, _extends3.default)({}, labelStyle, captionStyle) },
      _caption
    ),
    _react2.default.createElement(_InputSelect2.default, _options)
  );
};

exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map