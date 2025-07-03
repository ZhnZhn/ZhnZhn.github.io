"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SWITCH = "switch",
  CL_LABEL_SWITCH = `label-${CL_SWITCH}`,
  CL_SWITCH_TRACK = `${CL_SWITCH}-track`,
  CL_SWITCH_THUMB = `${CL_SWITCH}-thumb`,
  CL_SWITCH_LABEL = `${CL_SWITCH}-label`,
  TRACK_COLOR_CHECKED = "#2f7ed8",
  THUMB_COLOR_CHECKED = "var(--c-bg, #4d4d4d)",
  THUMB_POS_X_CHECKED = "16px",
  LABEL_COLOR_CHECKED = "var(--c-bl, black)",
  TRACK_COLOR = "#9e9e9e",
  THUMB_COLOR = "#d3d3d3",
  THUMB_POS_X = "4px",
  LABEL_COLOR = "#9e9e9e";
const _crSwicthStyle = isChecked => {
  const [_trackColor, _thumbColor, _thumbPosX, _labelColor] = isChecked ? [TRACK_COLOR_CHECKED, THUMB_COLOR_CHECKED, THUMB_POS_X_CHECKED, LABEL_COLOR_CHECKED] : [TRACK_COLOR, THUMB_COLOR, THUMB_POS_X, LABEL_COLOR];
  return [{
    backgroundColor: _trackColor
  }, {
    backgroundColor: _thumbColor,
    transform: `translate(${_thumbPosX}, 3px)`
  }, {
    color: _labelColor
  }];
};
const FN_NOOP = () => {};
const InputSwitch = _ref => {
  let {
    refEl,
    initialValue,
    className,
    style,
    caption,
    onToggle,
    onCheck = FN_NOOP,
    onUnCheck = FN_NOOP
  } = _ref;
  const _inputId = (0, _uiApi.useId)(),
    [_isChecked, _setIsChecked] = (0, _uiApi.useState)(() => !!initialValue),
    _hChange = evt => {
      const _nextValue = !_isChecked,
        _onChange = onToggle || (_nextValue ? onCheck : onUnCheck);
      _onChange(_nextValue);
      _setIsChecked(_nextValue);
    },
    [_trackStyle, _thumbStyle, _labelStyle] = _crSwicthStyle(_isChecked);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
    className: (0, _styleFn.crCn)(CL_LABEL_SWITCH, className),
    style: style,
    htmlFor: _inputId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: refEl,
      id: _inputId,
      type: "checkbox",
      role: "switch",
      className: CL_SWITCH,
      "aria-checked": _isChecked,
      checked: _isChecked,
      onChange: _hChange
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      "aria-hidden": "true",
      className: CL_SWITCH_TRACK,
      style: _trackStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_SWITCH_THUMB,
        style: _thumbStyle
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_SWITCH_LABEL,
      style: _labelStyle,
      children: caption
    })]
  });
};
var _default = exports.default = InputSwitch;
//# sourceMappingURL=InputSwitch.js.map