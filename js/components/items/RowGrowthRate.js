'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _SvgPlus = require('../zhn/SvgPlus');

var _SvgPlus2 = _interopRequireDefault(_SvgPlus);

var _SvgMinus = require('../zhn/SvgMinus');

var _SvgMinus2 = _interopRequireDefault(_SvgMinus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_COLOR = '#d2b772';

var S = {
  OC: {
    width: 'auto',
    paddingRight: 8
  },
  CAPTION: {
    color: 'black'
  },
  PL_8: {
    paddingLeft: 8
  },
  PL_24: {
    paddingLeft: 24
  },
  TEXT: {
    color: 'grey',
    fontWeight: 'bold'
  },
  OPTIONS: {
    paddingLeft: 6
  },
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  }
};

var RowGrowthRate = function RowGrowthRate(_ref) {
  var is = _ref.is,
      onMinus = _ref.onMinus,
      onPlus = _ref.onPlus;

  var _refColor = (0, _react.useRef)(INITIAL_COLOR),
      _refSeriaType = (0, _react.useRef)('column'),
      _refOnTop = (0, _react.useRef)(false),
      _onColor = function _onColor(color) {
    return _refColor.current = color;
  },
      _onCheckColumn = function _onCheckColumn() {
    return _refSeriaType.current = 'column';
  },
      _onUnCheckColumn = function _onUnCheckColumn() {
    return _refSeriaType.current = 'spline';
  },
      _onCheckTop = function _onCheckTop() {
    return _refOnTop.current = true;
  },
      _onUnCheckTop = function _onUnCheckTop() {
    return _refOnTop.current = false;
  },
      _onPlus = function _onPlus() {
    return onPlus({
      color: _refColor.current,
      type: _refSeriaType.current,
      zIndex: _refOnTop.current ? undefined : -1
    });
  };

  return _react2.default.createElement(
    _OpenClose2.default,
    {
      isClose: true,
      ocStyle: S.OC,
      caption: 'Growth Rate',
      captionStyle: S.CAPTION,
      openColor: 'black',
      CompAfter: is ? _react2.default.createElement(_SvgMinus2.default, { style: S.INLINE, onClick: onMinus }) : _react2.default.createElement(_SvgPlus2.default, { style: S.INLINE, onClick: _onPlus })
    },
    _react2.default.createElement(
      'div',
      { style: S.OPTIONS },
      _react2.default.createElement(_DialogCell2.default.RowInputColor, {
        styleCaption: S.NONE,
        initValue: INITIAL_COLOR,
        onEnter: _onColor
      }),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
          caption: 'Column',
          rootStyle: (0, _extends3.default)({}, S.INLINE, S.PL_8),
          initValue: true,
          onCheck: _onCheckColumn,
          onUnCheck: _onUnCheckColumn
        }),
        _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
          caption: 'OnTop',
          rootStyle: (0, _extends3.default)({}, S.INLINE, S.PL_24),
          initValue: false,
          onCheck: _onCheckTop,
          onUnCheck: _onUnCheckTop
        })
      ),
      _react2.default.createElement(
        'span',
        { style: S.TEXT },
        'Def: 100*(\u0394y',
        _react2.default.createElement(
          'sub',
          null,
          't1-t0'
        ),
        '/y',
        _react2.default.createElement(
          'sub',
          null,
          't0'
        ),
        ')'
      )
    )
  );
};

exports.default = RowGrowthRate;
//# sourceMappingURL=RowGrowthRate.js.map