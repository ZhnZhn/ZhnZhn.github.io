"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useProperty = require("../hooks/useProperty");
var _fUseKey = require("../hooks/fUseKey");
var _Svg = require("./svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_CHB = 'chb',
  CL_CHB_CHECKED = `${CL_CHB}-checked`,
  C_GREY = "#777777";
const FN_NOOP = () => {};
const _crAriaLabelledByProp = _ref => {
  let {
    labelId,
    ariaLabel
  } = _ref;
  return labelId ? {
    "aria-labelledby": labelId
  } : {
    "aria-label": ariaLabel || "Option"
  };
};
const SvgCheckBox = props => {
  const {
      initialValue,
      value,
      className,
      style,
      color,
      cnChecked = CL_CHB_CHECKED,
      onCheck = FN_NOOP,
      onUnCheck = FN_NOOP
    } = props,
    [valueState, setValueState] = (0, _uiApi.useState)(() => (0, _isTypeFn.isBool)(value) ? void 0 : !!initialValue),
    _isValueState = (0, _useProperty.useRefInit)(() => (0, _isTypeFn.isBool)(valueState)),
    _value = _isValueState ? valueState : value,
    _comp = (0, _uiApi.useMemo)(() => ({
      setUnchecked: () => setValueState(!1)
    }), [])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hToggle = (0, _uiApi.useCallback)(evt => {
      evt.preventDefault();
      const _toggle = _value ? onUnCheck : onCheck;
      _toggle(_comp);
      if (_isValueState) {
        setValueState(!_value);
      }
    }, [_value, onCheck, onUnCheck])
    //_comp, _isValueState
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hKeyDown = (0, _fUseKey.useKeyEnter)(_hToggle, [_hToggle]),
    _className = _value ? className : void 0,
    [_restStroke, _restFill] = _className ? [] : _value ? [color || C_GREY, color || _Svg.FILL_NONE] : [C_GREY, _Svg.FILL_NONE];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ..._crAriaLabelledByProp(props),
    role: "checkbox",
    tabIndex: "0",
    "aria-checked": _value,
    className: (0, _styleFn.crCn)(CL_CHB, _className),
    style: style,
    onClick: _hToggle,
    onKeyDown: _hKeyDown,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.Svg100, {
      w: "18",
      style: _styleFn.S_INLINE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
        x: "1",
        y: "1",
        height: "16",
        width: "16",
        strokeWidth: "2",
        rx: "3",
        stroke: _restStroke,
        fill: _restFill
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
        v: _value,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          className: cnChecked,
          d: "M 2,5 L 8,16 M 8,16 L 16,1",
          ..._Svg.STROKE_LINECAP_ROUND_PROPS
        })
      })]
    })
  });
};

/*
SvgCheckBox.propTypes = {
  initValue: PropTypes.bool,
  value: PropTypes.bool,
  style: PropTypes.object,
  color: PropTypes.string,
  labelId: PropTypes.string,
  ariaLabel: PropTypes.string,
  cnChecked: PropTypes.string,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}
*/
var _default = exports.default = SvgCheckBox;
//# sourceMappingURL=SvgCheckBox.js.map