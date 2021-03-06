"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _A = _interopRequireDefault(require("../zhn/A"));

var DF_COLOR = '#2b908f';
var OC_COLOR = 'black';
var DF_PERIOD = 1;
var DF_SERIA = 1;
var S = {
  ROOT_OC: {
    lineHeight: 'unset',
    paddingBottom: 4,
    marginLeft: -8
  },
  OC: {
    display: 'inline-block',
    height: 32,
    paddingTop: 4,
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
  CAPTION_SERIA_INPUT: {
    display: 'inline-block',
    width: 85,
    paddingLeft: 5,
    color: 'black',
    fontWeight: 'bold'
  },
  SERIA_INPUT: {
    width: 36
  },
  ROW_2: {
    paddingBottom: 6
  },
  VA_M: {
    verticalAlign: 'middle'
  },
  PL_6: {
    paddingLeft: 6
  },
  PL_8: {
    paddingLeft: 8
  },
  PL_10: {
    paddingLeft: 10
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
  fnSpan: function fnSpan(color) {
    return {
      color: color,
      paddingLeft: 8,
      fontWeight: 'bold'
    };
  }
};
var S1 = {
  COLUMN: (0, _extends2["default"])({}, S.INLINE, S.VA_M, S.PL_10),
  ON_TOP: (0, _extends2["default"])({}, S.INLINE, S.VA_M, S.PL_10)
};

var InputPlus = function InputPlus(_ref) {
  var initValue = _ref.initValue,
      onChangePeriod = _ref.onChangePeriod,
      onPlus = _ref.onPlus;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].InputText, {
      style: S.PERIOD_INPUT,
      type: "number",
      initValue: initValue,
      min: 1,
      max: 999,
      maxLength: 3,
      onChange: onChangePeriod,
      onEnter: onPlus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgPlus, {
      style: S.INLINE,
      onClick: onPlus
    })]
  });
};

var MinusPeriod = function MinusPeriod(_ref2) {
  var color = _ref2.color,
      period = _ref2.period,
      onMinus = _ref2.onMinus;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgMinus, {
      style: S.INLINE,
      onClick: onMinus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.fnSpan(color),
      children: period
    })]
  });
};
/*
const Defenition = ({ Def }) => Def
 ? <div style={S.TEXT}>
     {Def}
   </div>
: null;
*/


var _fChangeNumber = function _fChangeNumber(ref, dfValue) {
  return function (n) {
    return ref.current = parseInt(n, 10) || dfValue;
  };
};

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
      _refSeria = (0, _react.useRef)(DF_SERIA),
      _refOnTop = (0, _react.useRef)(false),
      _onColor = function _onColor(color) {
    return _refColor.current = color;
  },
      _onChangePeriod = _fChangeNumber(_refPeriod, DF_PERIOD),
      _onToggleColumn = function _onToggleColumn(is) {
    return _refSeriaType.current = is ? 'column' : 'spline';
  },
      _onChangeSeria = _fChangeNumber(_refSeria, DF_SERIA),
      _onToggleTop = function _onToggleTop(is) {
    return _refOnTop.current = is;
  },
      _onPlus = function _onPlus() {
    return onPlus({
      s: _refSeria.current,
      color: _refColor.current,
      type: _refSeriaType.current,
      zIndex: _refOnTop.current ? void 0 : -1
    }, _refPeriod.current);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].OpenClose, {
    caption: caption,
    style: S.ROOT_OC,
    ocStyle: S.OC,
    captionStyle: S.CAPTION,
    openColor: OC_COLOR,
    CompAfter: is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MinusPeriod, {
      color: _refColor.current,
      period: _refPeriod.current,
      onMinus: onMinus
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(InputPlus, {
      initValue: _refPeriod.current,
      onChangePeriod: _onChangePeriod,
      onPlus: _onPlus
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.PL_8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputColor, {
        style: S.INLINE,
        initValue: DF_COLOR,
        onEnter: _onColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
        caption: "Column",
        style: S1.COLUMN,
        captionStyle: S.PL_6,
        checkedColor: OC_COLOR,
        initValue: true,
        onToggle: _onToggleColumn
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S.ROW_2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputText, {
          rootStyle: S.INLINE,
          caption: "For Seria",
          captionStyle: S.CAPTION_SERIA_INPUT,
          style: S.SERIA_INPUT,
          type: "number",
          initValue: 1,
          min: 1,
          max: 9,
          maxLength: 1,
          onChange: _onChangeSeria,
          onEnter: _onPlus
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowCheckBox, {
          caption: "OnTop",
          style: S1.ON_TOP,
          captionStyle: S.PL_6,
          checkedColor: OC_COLOR,
          initValue: false,
          onToggle: _onToggleTop
        })]
      })]
    })
  });
};

var _default = RowType1;
exports["default"] = _default;
//# sourceMappingURL=RowType1.js.map