"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _styleFn = require("../styleFn");
var _BtSvgX = require("../zhn/BtSvgX");
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));
var _ArrowCell = _interopRequireDefault(require("./ArrowCell"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_CLEAR = {
  ...(0, _styleFn.crAbsoluteTopLeftStyle)(5, 8, !0),
  stroke: '#1b75bb'
};
const _crNumberOfOptionsToken = propsOptions => {
  const _propsOptionsLength = (propsOptions || []).length;
  return _propsOptionsLength > 999 ? `(${_propsOptionsLength})` : '';
};
const crAfterInputEl = (isLoading, isLoadingFailed, placeholder, optionName, optionNames, onLoadOption, isBtSvgClear, isShowOption, labelId, optionsViewId, _refBtClear, _hClear, _hToggleOptions, propsOptions) => {
  const _optionNames = optionNames || optionName || '';
  return isLoading ? [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: _CL.CL_SPINNER,
    "data-loader": "circle"
  }), (0, _arrFn.joinByBlank)('Loading', _optionNames, '...')] : isLoadingFailed ? [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    className: _CL.CL_SPINNER_FAILED,
    dataLoader: "circle-failed",
    onClick: onLoadOption
  }), (0, _arrFn.joinByBlank)('Loading', _optionNames, 'Failed')] : isBtSvgClear ? [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClear, {
    refEl: _refBtClear,
    style: S_SVG_CLEAR,
    onClick: _hClear
  })] : [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowCell.default, {
    isShowOption: isShowOption,
    labelId: labelId,
    controlsId: optionsViewId,
    onClick: _hToggleOptions
  }), placeholder || (0, _arrFn.joinByBlank)('Select', optionName, _crNumberOfOptionsToken(propsOptions), '...')];
};
var _default = exports.default = crAfterInputEl;
//# sourceMappingURL=crAfterInputEl.js.map