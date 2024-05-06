"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _BtSvgX = require("../zhn/BtSvgX");
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));
var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_CLEAR = {
  position: 'absolute',
  top: 5,
  right: 8,
  stroke: '#1b75bb'
};
const crAfterInputEl = (isLoading, isLoadingFailed, placeholder, optionName, optionNames, onLoadOption, isBtSvgClear, isShowOption, labelId, optionsViewId, _hClear, _hToggleOptions) => {
  const _optionNames = optionNames || optionName || '';
  let _placeholder, _afterInputEl;
  if (!isLoading && !isLoadingFailed) {
    if (isBtSvgClear) {
      _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClear, {
        style: S_SVG_CLEAR,
        onClick: _hClear
      });
    } else {
      _placeholder = placeholder || "Select " + optionName + "...";
      _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {
        isShowOption: isShowOption,
        labelId: labelId,
        controlsId: optionsViewId,
        onClick: _hToggleOptions
      });
    }
  } else if (isLoading) {
    _placeholder = "Loading " + _optionNames + "...";
    _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _CL.CL_SPINNER,
      "data-loader": "circle"
    });
  } else if (isLoadingFailed) {
    _placeholder = "Loading " + _optionNames + " Failed";
    _afterInputEl = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
      className: _CL.CL_SPINNER_FAILED,
      dataLoader: "circle-failed",
      onClick: onLoadOption
    });
  }
  return [_afterInputEl, _placeholder];
};
var _default = exports.default = crAfterInputEl;
//# sourceMappingURL=crAfterInputEl.js.map