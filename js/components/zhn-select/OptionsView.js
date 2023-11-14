"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _InputSelectFn = require("./InputSelectFn");
var _OptionList = _interopRequireDefault(require("./OptionList"));
var _OptionsFooter = _interopRequireDefault(require("./OptionsFooter"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crFooterIndex = options => options[0] && options[0].value !== _InputSelectFn.NO_RESULT ? options.length : 0;
const OptionsView = _ref => {
  let {
    widthStyle,
    optionsStyle,
    propCaption,
    ItemOptionComp,
    noFooterBts,
    options,
    nAll,
    refOptionsComp,
    refOptionNode,
    refIndexNode,
    indexActive,
    onClickItem,
    onClear
  } = _ref;
  /*eslint-disable react-hooks/exhaustive-deps */
  const _optionListEl = (0, _uiApi.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionList.default, {
      options: options,
      refOptionNode: refOptionNode,
      className: _CL.CL_OPTIONS_ROW,
      selectedIndex: indexActive,
      propCaption: propCaption,
      onClick: onClickItem,
      ItemComp: ItemOptionComp
    }), [options])
    // indexActive
    /*eslint-enable react-hooks/exhaustive-deps */,
    _nFiltered = _crFooterIndex(options);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: _CL.CL_OPTIONS,
    style: widthStyle,
    "data-scrollable": true,
    tabIndex: "-1",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: refOptionsComp,
      className: _CL.CL_OPTIONS_DIV,
      style: {
        ...optionsStyle,
        ...widthStyle
      },
      tabIndex: "-1",
      children: _optionListEl
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsFooter.default, {
      ref: refIndexNode,
      noFooterBts: noFooterBts,
      indexActiveOption: indexActive,
      nAll: nAll,
      nFiltered: _nFiltered,
      onClear: onClear
    })]
  });
};
var _default = exports.default = OptionsView;
//# sourceMappingURL=OptionsView.js.map