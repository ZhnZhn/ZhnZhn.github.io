"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _seriaFn = require("../../math/seriaFn");
var _useModalMenuIndicators = _interopRequireDefault(require("./useModalMenuIndicators"));
var _IndicatorType = require("./IndicatorType");
var _ModalMenu = require("./ModalMenu.Style");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowFnType = _interopRequireDefault(require("./RowFnType1"));
var _RowFnPlusMinus = _interopRequireDefault(require("./RowFnPlusMinus"));
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
const C_GROW = '#90ed7d',
  S_PANE = {
    width: 265,
    margin: 8
  };
const FN_ROC = ['ROC', C_GROW, _seriaFn.growthRate, true],
  FN_DIFF = ['DIFF', C_GROW, _seriaFn.changesBetween, true],
  FN_NORM = ['NORM', C_GROW, _seriaFn.normalize, false];
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
  const indicatorConfigs = (0, _useModalMenuIndicators.default)(config);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    isShow: isShow,
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowFnPlusMinus.default, {
        caption: NORM_CAPTION_EL,
        configArr: FN_NORM,
        getChart: getChart
      }), indicatorConfigs.map(_ref2 => {
        let [RowComp, key, type] = _ref2;
        const _restProps = type === _IndicatorType.INDICATOR_TYPE_1 ? {
          config
        } : {
          onAddMfi,
          onRemoveMfi
        };
        return /*#__PURE__*/(0, _react.createElement)(RowComp, {
          ..._restProps,
          key: key,
          getChart: getChart
        });
      })]
    })
  });
};
var _default = ModalMenuIndicator;
exports.default = _default;
//# sourceMappingURL=ModalMenuIndicator.js.map