"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useClickOutside = _interopRequireDefault(require("../hooks/useClickOutside"));
var _InputSelectFn = require("./InputSelectFn");
var _OptionList = _interopRequireDefault(require("./OptionList"));
var _OptionsFooter = _interopRequireDefault(require("./OptionsFooter"));
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const _crFooterIndex = options => {
  const _item = options[0];
  return _item && _item.value !== _InputSelectFn.NO_RESULT ? options.length : 0;
};
const OptionsView = _ref => {
  let {
    id,
    widthStyle,
    optionsStyle,
    propCaption,
    ItemOptionComp,
    noFooterBts,
    options,
    nAll,
    refOptionsComp,
    refIndexNode,
    indexActive,
    onClickItem,
    onClear,
    onClickOutside
  } = _ref;
  /*eslint-disable react-hooks/exhaustive-deps */
  const _optionListEl = (0, _uiApi.useMemo)(() => /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionList.default, {
      options: options,
      className: _CL.CL_OPTIONS_ROW,
      selectedIndex: indexActive,
      propCaption: propCaption,
      onClick: onClickItem,
      ItemComp: ItemOptionComp
    }), [options])
    // indexActive
    /*eslint-enable react-hooks/exhaustive-deps */,
    _nFiltered = _crFooterIndex(options),
    _refOptionsView = (0, _useClickOutside.default)(true, onClickOutside);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: _refOptionsView,
    id: id,
    className: _CL.CL_OPTIONS,
    style: widthStyle,
    "data-scrollable": true,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: refOptionsComp,
      className: _CL.CL_OPTIONS_DIV,
      style: {
        ...optionsStyle,
        ...widthStyle
      },
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