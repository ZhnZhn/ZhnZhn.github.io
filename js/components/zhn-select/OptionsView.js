"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputSelectFn = require("./InputSelectFn");
var _OptionsFooter = _interopRequireDefault(require("./OptionsFooter"));
var _styleFn = require("../styleFn");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crFooterIndex = (options, initialOptions) => [
//_nFiltered
options[0] && options[0].value !== _InputSelectFn.NO_RESULT ? options.length : 0,
// _nAll
initialOptions ? initialOptions.length : 0];
const OptionsView = _ref => {
  let {
    optionsStyle,
    width,
    noFooterBts,
    isShowOption,
    options,
    initialOptions,
    optionListEl,
    refOptionsComp,
    refIndexNode,
    indexActive,
    onClear
  } = _ref;
  const _styleOptions = isShowOption ? _styleFn.S_BLOCK : _styleFn.S_NONE,
    _rootWidthStyle = (0, _InputSelectFn.crWidthStyle)(width, _styleOptions),
    [_nFiltered, _nAll] = _crFooterIndex(options, initialOptions);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _CL.CL_OPTIONS,
    style: _rootWidthStyle,
    "data-scrollable": true,
    tabIndex: "-1",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: refOptionsComp,
      className: _CL.CL_OPTIONS_DIV,
      style: {
        ...optionsStyle,
        ..._rootWidthStyle
      },
      tabIndex: "-1",
      children: optionListEl
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsFooter.default, {
      ref: refIndexNode,
      noFooterBts: noFooterBts,
      indexActiveOption: indexActive,
      nAll: _nAll,
      nFiltered: _nFiltered,
      onClear: onClear
    })]
  });
};
var _default = exports.default = OptionsView;
//# sourceMappingURL=OptionsView.js.map