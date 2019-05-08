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

var _A = require('../zhn/A');

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_COLOR = '#d2b772';
var DF_PERIOD = 1;

var S = {
  ROOT_OC: {
    marginLeft: -8
  },
  OC: {
    width: 'auto',
    paddingRight: 8,
    marginRight: 8
  },
  CAPTION: {
    color: 'black'
  },
  PERIOD_CAPTION: {
    display: 'inline-block',
    color: 'black',
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  PERIOD_INPUT: {
    width: 56
  },
  PL_4: {
    paddingLeft: 4
  },
  PL_6: {
    paddingLeft: 6
  },
  PL_8: {
    paddingLeft: 8
  },
  PL_24: {
    paddingLeft: 24
  },
  TEXT: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 4,
    fontWeight: 'bold'
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
      _refPeriod = (0, _react.useRef)(DF_PERIOD),
      _refSeriaType = (0, _react.useRef)('column'),
      _refOnTop = (0, _react.useRef)(false),
      _onColor = function _onColor(color) {
    return _refColor.current = color;
  },
      _onChangePeriod = function _onChangePeriod(n) {
    return _refPeriod.current = parseInt(n, 10) || DF_PERIOD;
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
    }, _refPeriod.current);
  };

  return _react2.default.createElement(
    _A2.default.OpenClose,
    {
      isClose: true,
      rootStyle: S.ROOT_OC,
      ocStyle: S.OC,
      caption: 'Growth Rate',
      captionStyle: S.CAPTION,
      openColor: 'black',
      CompAfter: is ? _react2.default.createElement(_A2.default.SvgMinus, { style: S.INLINE, onClick: onMinus }) : _react2.default.createElement(_A2.default.SvgPlus, { style: S.INLINE, onClick: _onPlus })
    },
    _react2.default.createElement(
      'div',
      { style: S.PL_8 },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_DialogCell2.default.RowInputColor, {
          styleRoot: S.INLINE,
          styleCaption: S.NONE,
          initValue: INITIAL_COLOR,
          onEnter: _onColor
        }),
        _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
          caption: 'Column',
          rootStyle: (0, _extends3.default)({}, S.INLINE, S.PL_8),
          styleCaption: S.PL_6,
          initValue: true,
          onCheck: _onCheckColumn,
          onUnCheck: _onUnCheckColumn
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_DialogCell2.default.RowInputText, {
          styleRoot: S.INLINE,
          captionStyle: S.PERIOD_CAPTION,
          caption: 'Period',
          inputStyle: S.PERIOD_INPUT,
          type: 'number',
          initValue: 1,
          min: 1,
          max: 999,
          maxLength: 3,
          onInputChange: _onChangePeriod,
          onEnter: _onPlus
        }),
        _react2.default.createElement(_DialogCell2.default.RowCheckBox, {
          caption: 'OnTop',
          rootStyle: (0, _extends3.default)({}, S.INLINE, S.PL_4),
          styleCaption: S.PL_6,
          initValue: false,
          onCheck: _onCheckTop,
          onUnCheck: _onUnCheckTop
        })
      ),
      _react2.default.createElement(
        'div',
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