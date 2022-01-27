"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _A = _interopRequireDefault(require("../zhn/A"));

var _jsxRuntime = require("react/jsx-runtime");

const DF_COLOR = '#2b908f',
      OC_COLOR = 'black',
      DF_PERIOD = 1,
      DF_SERIA = 1,
      S_ROOT_OC = {
  lineHeight: 'unset',
  paddingBottom: 4,
  marginLeft: -8
},
      S_OC = {
  display: 'inline-block',
  height: 32,
  paddingTop: 4,
  width: 'auto',
  paddingRight: 8
},
      S_CAPTION = {
  color: OC_COLOR
},
      S_PERIOD_INPUT = {
  width: 56,
  marginRight: 12
},
      S_CAPTION_SERIA_INPUT = {
  display: 'inline-block',
  width: 85,
  paddingLeft: 5,
  color: 'black',
  fontWeight: 'bold'
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
      crSpanStyle = color => ({
  color,
  paddingLeft: 8,
  fontWeight: 'bold'
}),
      S1_COLUMN = { ...S_INLINE,
  ...S_VA_M,
  ...S_PL_10
},
      S1_ON_TOP = { ...S_INLINE,
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.InputText, {
      style: S_PERIOD_INPUT,
      type: "number",
      initValue: initValue,
      min: 1,
      max: 999,
      maxLength: 3,
      onChange: onChangePeriod,
      onEnter: onPlus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgPlus, {
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgMinus, {
      style: S_INLINE,
      onClick: onMinus
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: crSpanStyle(color),
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


const _fChangeNumber = (ref, dfValue) => n => ref.current = parseInt(n, 10) || dfValue;

const RowType1 = _ref3 => {
  let {
    is,
    caption,
    dfColor = DF_COLOR,
    //Def=null,
    onMinus,
    onPlus
  } = _ref3;

  const _refColor = (0, _react.useRef)(dfColor),
        _refPeriod = (0, _react.useRef)(DF_PERIOD),
        _refSeriaType = (0, _react.useRef)('column'),
        _refSeria = (0, _react.useRef)(DF_SERIA),
        _refOnTop = (0, _react.useRef)(false),
        _onColor = color => _refColor.current = color,
        _onChangePeriod = _fChangeNumber(_refPeriod, DF_PERIOD),
        _onToggleColumn = is => _refSeriaType.current = is ? 'column' : 'spline',
        _onChangeSeria = _fChangeNumber(_refSeria, DF_SERIA),
        _onToggleTop = is => _refOnTop.current = is,
        _onPlus = () => onPlus({
    s: _refSeria.current,
    color: _refColor.current,
    type: _refSeriaType.current,
    zIndex: _refOnTop.current ? void 0 : -1
  }, _refPeriod.current);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.OpenClose, {
    caption: caption,
    style: S_ROOT_OC,
    ocStyle: S_OC,
    captionStyle: S_CAPTION,
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
      style: S_PL_8,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputColor, {
        style: S_INLINE,
        initValue: DF_COLOR,
        onEnter: _onColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
        caption: "Column",
        style: S1_COLUMN,
        captionStyle: S_PL_6,
        checkedColor: OC_COLOR,
        initValue: true,
        onToggle: _onToggleColumn
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S_ROW_2,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputText, {
          rootStyle: S_INLINE,
          caption: "For Seria",
          captionStyle: S_CAPTION_SERIA_INPUT,
          style: S_SERIA_INPUT,
          type: "number",
          initValue: 1,
          min: 1,
          max: 9,
          maxLength: 1,
          onChange: _onChangeSeria,
          onEnter: _onPlus
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowCheckBox, {
          caption: "OnTop",
          style: S1_ON_TOP,
          captionStyle: S_PL_6,
          checkedColor: OC_COLOR,
          initValue: false,
          onToggle: _onToggleTop
        })]
      })]
    })
  });
};

var _default = RowType1;
exports.default = _default;
//# sourceMappingURL=RowType1.js.map