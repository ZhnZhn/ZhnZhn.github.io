"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox2"));
var _BtSvgCircle = require("../zhn/BtSvgCircle");
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _Row = require("./Row.Style");
var _jsxRuntime = require("react/jsx-runtime");
const DF_COLOR = '#2b908f',
  DF_PERIOD = 1,
  DF_SERIA = 1,
  S_PERIOD_INPUT = {
    width: 56,
    marginRight: 12
  },
  S_SERIA_INPUT = {
    width: 36
  },
  S_ROW_2 = {
    paddingBottom: 6
  },
  S_VA_M = {
    verticalAlign: 'middle'
  },
  S_PL_6 = {
    paddingLeft: 6
  },
  S_PL_8 = {
    paddingLeft: 8
  },
  S_PL_10 = {
    paddingLeft: 10
  },
  S_INLINE = {
    display: 'inline-block'
  },
  S_CAPTION_STYLE = {
    ..._Row.S_INLINE_BLOCK_BOLD,
    width: 85,
    paddingLeft: 5
  },
  crSpanStyle = color => ({
    color,
    paddingLeft: 8,
    fontWeight: 'bold'
  }),
  S1_COLUMN = {
    ...S_INLINE,
    ...S_VA_M,
    ...S_PL_10
  },
  S1_ON_TOP = {
    ...S_INLINE,
    ...S_VA_M,
    ...S_PL_10
  };
const InputPlus = _ref => {
  let {
    initValue,
    onChangePeriod,
    onPlus
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      style: S_PERIOD_INPUT,
      type: "number",
      initValue: initValue,
      min: 1,
      max: 999,
      maxLength: 3,
      onChange: onChangePeriod,
      onEnter: onPlus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgPlus, {
      style: S_INLINE,
      onClick: onPlus
    })]
  });
};
const MinusPeriod = _ref2 => {
  let {
    color,
    period,
    onMinus
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgCircle.SvgMinus, {
      style: S_INLINE,
      onClick: onMinus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: crSpanStyle(color),
      children: period
    })]
  });
};
const _fChangeNumber = (ref, dfValue) => n => (0, _uiApi.setRefValue)(ref, parseInt(n, 10) || dfValue);
const RowType1 = _ref3 => {
  let {
    is,
    caption,
    dfColor = DF_COLOR,
    onMinus,
    onPlus
  } = _ref3;
  const _refColor = (0, _uiApi.useRef)(dfColor),
    _refPeriod = (0, _uiApi.useRef)(DF_PERIOD),
    _refSeriaType = (0, _uiApi.useRef)('column'),
    _refSeria = (0, _uiApi.useRef)(DF_SERIA),
    _refOnTop = (0, _uiApi.useRef)(false),
    _onColor = color => (0, _uiApi.setRefValue)(_refColor, color),
    _onChangePeriod = _fChangeNumber(_refPeriod, DF_PERIOD),
    _onToggleColumn = is => (0, _uiApi.setRefValue)(_refSeriaType, is ? 'column' : 'spline'),
    _onChangeSeria = _fChangeNumber(_refSeria, DF_SERIA),
    _onToggleTop = is => (0, _uiApi.setRefValue)(_refOnTop, is),
    _onPlus = () => onPlus({
      s: (0, _uiApi.getRefValue)(_refSeria),
      color: (0, _uiApi.getRefValue)(_refColor),
      type: (0, _uiApi.getRefValue)(_refSeriaType),
      zIndex: (0, _uiApi.getRefValue)(_refOnTop) ? void 0 : -1
    }, (0, _uiApi.getRefValue)(_refPeriod));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    caption: caption,
    className: _styleFn.CL_OPEN_CLOSE_BLACK,
    style: _Row.S_OPEN_CLOSE,
    ocStyle: _Row.S_OC_STYLE,
    CompAfter: is ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MinusPeriod, {
      color: (0, _uiApi.getRefValue)(_refColor),
      period: (0, _uiApi.getRefValue)(_refPeriod),
      onMinus: onMinus
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(InputPlus, {
      initValue: (0, _uiApi.getRefValue)(_refPeriod),
      onChangePeriod: _onChangePeriod,
      onPlus: _onPlus
    }),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_PL_8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputColor, {
        style: S_INLINE,
        initValue: DF_COLOR,
        onEnter: _onColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
        style: S1_COLUMN,
        caption: "Column",
        captionStyle: S_PL_6,
        chbCn: _styleFn.CL_CHB_BLACK,
        btCn: _styleFn.CL_BLACK,
        initialValue: true,
        onToggle: _onToggleColumn
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_ROW_2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputText, {
          rootStyle: S_INLINE,
          caption: "For Seria",
          captionCn: _styleFn.CL_BLACK,
          captionStyle: S_CAPTION_STYLE,
          style: S_SERIA_INPUT,
          type: "number",
          initValue: 1,
          min: 1,
          max: 9,
          maxLength: 1,
          onChange: _onChangeSeria,
          onEnter: _onPlus
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
          style: S1_ON_TOP,
          caption: "OnTop",
          captionStyle: S_PL_6,
          chbCn: _styleFn.CL_CHB_BLACK,
          btCn: _styleFn.CL_BLACK,
          onToggle: _onToggleTop
        })]
      })]
    })
  });
};
var _default = exports.default = RowType1;
//# sourceMappingURL=RowType1.js.map