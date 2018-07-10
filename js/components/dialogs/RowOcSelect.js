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

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _InputSelect = require('../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C_OPEN = "#1b75bb";
var S = {
  OC: {
    verticalAlign: 'top',
    paddingTop: 6,
    paddingBottom: 10
  },
  CAPTION: {
    color: C_OPEN
  },
  OPTIONS: {
    width: 250
  }
};

var RowOcSelect = function RowOcSelect(_ref) {
  var _ref$isShowLabels = _ref.isShowLabels,
      isShowLabels = _ref$isShowLabels === undefined ? true : _ref$isShowLabels,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? '' : _ref$caption,
      captionStyle = _ref.captionStyle,
      children = _ref.children,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['isShowLabels', 'caption', 'captionStyle', 'children']);
  var _caption = caption.indexOf(':') === -1 && caption !== '' ? caption + ':' : caption,
      _STYLE$crRowOcSelectS = _DialogStyles2.default.crRowOcSelectStyle(isShowLabels),
      rowStyle = _STYLE$crRowOcSelectS.rowStyle,
      labelStyle = _STYLE$crRowOcSelectS.labelStyle,
      optionName = isShowLabels ? '' : caption.replace(':', ''),
      _options = (0, _extends3.default)({}, S.OPTIONS, rest, { optionName: optionName });

  return _react2.default.createElement(
    _OpenClose2.default,
    {
      isClose: true,
      rootStyle: rowStyle,
      ocStyle: (0, _extends3.default)({}, S.OC, labelStyle, captionStyle),
      caption: _caption,
      captionStyle: S.CAPTION,
      openColor: C_OPEN,
      CompAfter: _react2.default.createElement(_InputSelect2.default, _options)
    },
    children
  );
};

exports.default = RowOcSelect;
//# sourceMappingURL=RowOcSelect.js.map