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

var _OpenClose = require('../../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _InputSelect = require('../../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _useRowOptions2 = require('./useRowOptions');

var _useRowOptions3 = _interopRequireDefault(_useRowOptions2);

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
  }
};

var RowOcSelect = function RowOcSelect(_ref) {
  var children = _ref.children,
      restProps = (0, _objectWithoutProperties3.default)(_ref, ['children']);

  var _useRowOptions = (0, _useRowOptions3.default)(restProps, { isOc: true }),
      rowStyle = _useRowOptions.rowStyle,
      labelStyle = _useRowOptions.labelStyle,
      caption = _useRowOptions.caption,
      options = _useRowOptions.options;

  return _react2.default.createElement(
    _OpenClose2.default,
    {
      isClose: true,
      rootStyle: rowStyle,
      ocStyle: (0, _extends3.default)({}, S.OC, labelStyle),
      caption: caption,
      captionStyle: S.CAPTION,
      openColor: C_OPEN,
      CompAfter: _react2.default.createElement(_InputSelect2.default, options)
    },
    children
  );
};

exports.default = RowOcSelect;
//# sourceMappingURL=RowOcSelect.js.map