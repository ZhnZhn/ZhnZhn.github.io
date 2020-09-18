"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _A = _interopRequireDefault(require("../zhn/A"));

var DF_COLOR = '#d2b772';
var OC_COLOR = 'black';
var DF_PERIOD = 1;
var S = {
  ROOT_OC: {
    marginLeft: -8
  },
  OC: {
    width: 'auto',
    paddingRight: 8
  },
  CAPTION: {
    color: OC_COLOR
  },
  PERIOD_INPUT: {
    width: 56,
    marginRight: 12
  },
  ROW_CHB: {
    lineHeight: 'initial',
    paddingBottom: 4
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
  },
  fnSpan: function fnSpan(color) {
    return {
      color: color,
      paddingLeft: 8,
      fontWeight: 'bold'
    };
  }
};

var InputPlus = function InputPlus(_ref) {
  var initValue = _ref.initValue,
      onChangePeriod = _ref.onChangePeriod,
      onPlus = _ref.onPlus;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_A["default"].InputText, {
    style: S.PERIOD_INPUT,
    type: "number",
    initValue: initValue,
    min: 1,
    max: 999,
    maxLength: 3,
    onChange: onChangePeriod,
    onEnter: onPlus
  }), /*#__PURE__*/_react["default"].createElement(_A["default"].SvgPlus, {
    style: S.INLINE,
    onClick: onPlus
  }));
};

var MinusPeriod = function MinusPeriod(_ref2) {
  var color = _ref2.color,
      period = _ref2.period,
      onMinus = _ref2.onMinus;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_A["default"].SvgMinus, {
    style: S.INLINE,
    onClick: onMinus
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: S.fnSpan(color)
  }, period));
};
/*
const Defenition = ({ Def }) => Def
 ? <div style={S.TEXT}>
     {Def}
   </div>
: null;
*/


var RowType1 = function RowType1(_ref3) {
  var is = _ref3.is,
      caption = _ref3.caption,
      _ref3$dfColor = _ref3.dfColor,
      dfColor = _ref3$dfColor === void 0 ? DF_COLOR : _ref3$dfColor,
      onMinus = _ref3.onMinus,
      onPlus = _ref3.onPlus;

  var _refColor = (0, _react.useRef)(dfColor),
      _refPeriod = (0, _react.useRef)(DF_PERIOD),
      _refSeriaType = (0, _react.useRef)('column'),
      _refOnTop = (0, _react.useRef)(false),
      _onColor = function _onColor(color) {
    return _refColor.current = color;
  },
      _onChangePeriod = function _onChangePeriod(n) {
    return _refPeriod.current = parseInt(n, 10) || DF_PERIOD;
  },
      _onToggleColumn = function _onToggleColumn(is) {
    return _refSeriaType.current = is ? 'column' : 'spline';
  },
      _onToggleTop = function _onToggleTop(is) {
    return _refOnTop.current = is;
  },
      _onPlus = function _onPlus() {
    return onPlus({
      color: _refColor.current,
      type: _refSeriaType.current,
      zIndex: _refOnTop.current ? void 0 : -1
    }, _refPeriod.current);
  };

  return /*#__PURE__*/_react["default"].createElement(_A["default"].OpenClose, {
    caption: caption,
    style: S.ROOT_OC,
    ocStyle: S.OC,
    captionStyle: S.CAPTION,
    openColor: OC_COLOR,
    CompAfter: is ? /*#__PURE__*/_react["default"].createElement(MinusPeriod, {
      color: _refColor.current,
      period: _refPeriod.current,
      onMinus: onMinus
    }) : /*#__PURE__*/_react["default"].createElement(InputPlus, {
      initValue: _refPeriod.current,
      onChangePeriod: _onChangePeriod,
      onPlus: _onPlus
    })
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: S.PL_8
  }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowInputColor, {
    styleCaption: S.NONE,
    initValue: DF_COLOR,
    onEnter: _onColor
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: S.ROW_CHB
  }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    caption: "Column",
    rootStyle: (0, _extends2["default"])({}, S.INLINE, S.PL_6),
    captionStyle: S.PL_6,
    checkedColor: OC_COLOR,
    initValue: true,
    onToggle: _onToggleColumn
  }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].RowCheckBox, {
    caption: "OnTop",
    rootStyle: (0, _extends2["default"])({}, S.INLINE, S.PL_24),
    captionStyle: S.PL_6,
    checkedColor: OC_COLOR,
    initValue: false,
    onToggle: _onToggleTop
  }))));
};

var _default = RowType1;
exports["default"] = _default;
//# sourceMappingURL=RowType1.js.map