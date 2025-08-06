"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _seriaFn = require("../../math/seriaFn");
var _ModalMenu = require("./ModalMenu.Style");
var _ModalPane = _interopRequireDefault(require("../zhn-moleculs/ModalPane"));
var _RowFnType = _interopRequireDefault(require("./RowFnType1"));
var _RowNorm = _interopRequireDefault(require("./RowNorm"));
var _RowIndicators = require("./RowIndicators");
var _jsxRuntime = require("react/jsx-runtime");
const C_GROW = '#90ed7d',
  S_PANE = {
    width: 265,
    margin: 8
  };
const FN_ROC = ['ROC', C_GROW, _seriaFn.growthRate, true],
  FN_DIFF = ['DIFF', C_GROW, _seriaFn.changesBetween, true],
  FN_NORM = ['NORM', C_GROW, _seriaFn.normalize, true];
const NORM_CAPTION_EL = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
  children: ["Normalize (100*y", /*#__PURE__*/(0, _jsxRuntime.jsx)("sub", {
    children: "t"
  }), "/y", /*#__PURE__*/(0, _jsxRuntime.jsx)("sub", {
    children: "0"
  }), ")"]
});
const DF_GET_GHART = () => {};
const ModalMenuIndicator = _ref => {
  let {
    isShow,
    style,
    config,
    getChart = DF_GET_GHART,
    onClose,
    onAddMfi,
    onRemoveMfi
  } = _ref;
  return getChart() ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPane.default, {
    isShow: isShow,
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowFnType.default, {
        caption: "Changes Between",
        configArr: FN_DIFF,
        getChart: getChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowFnType.default, {
        caption: "Growth Rate",
        configArr: FN_ROC,
        getChart: getChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowNorm.default, {
        caption: NORM_CAPTION_EL,
        configArr: FN_NORM,
        getChart: getChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowIndicators.RowIndicators, {
        config: config,
        getChart: getChart,
        onAddMfi: onAddMfi,
        onRemoveMfi: onRemoveMfi
      })]
    })
  }) : null;
};
var _default = exports.default = ModalMenuIndicator;
//# sourceMappingURL=ModalMenuIndicator.js.map