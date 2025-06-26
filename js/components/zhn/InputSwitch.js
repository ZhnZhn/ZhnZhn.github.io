"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const CL_SWICTH = "switch",
  CL_LABEL_SWITCH = `label-${CL_SWICTH}`,
  CL_SWICTH_TRACK = `${CL_SWICTH}-track`,
  CL_SWICTH_THUMB = `${CL_SWICTH}-thumb`,
  CL_SWITCH_LABEL = `${CL_SWICTH}-label`,
  TRACK_COLOR_CHECKED = "#2f7ed8",
  THUMB_COLOR_CHECKED = "var(--c-bg, #4d4d4d)",
  THUMB_POS_X_CHECKED = "14px",
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
    initialValue,
    style,
    caption,
    onCheck = FN_NOOP,
    onUnCheck = FN_NOOP
  } = _ref;
  const _inputId = (0, _uiApi.useId)(),
    [_isChecked, _setIsChecked] = (0, _uiApi.useState)(initialValue),
    _hChange = evt => {
      const _nextValue = !_isChecked,
        _onChange = _nextValue ? onCheck : onUnCheck;
      _onChange();
      _setIsChecked(_nextValue);
    },
    [_trackStyle, _thumbStyle, _labelStyle] = _crSwicthStyle(_isChecked);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
    className: CL_LABEL_SWITCH,
    style: style,
    htmlFor: _inputId,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      id: _inputId,
      type: "checkbox",
      role: "switch",
      className: CL_SWICTH,
      "aria-checked": _isChecked,
      checked: _isChecked,
      onChange: _hChange
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      "aria-hidden": "true",
      className: CL_SWICTH_TRACK,
      style: _trackStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_SWICTH_THUMB,
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