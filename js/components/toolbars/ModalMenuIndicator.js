"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _seriaFn = require("../../math/seriaFn");
var _useAddSeriaBy = _interopRequireDefault(require("./useAddSeriaBy"));
var _useMomAth = _interopRequireDefault(require("./useMomAth"));
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowType = _interopRequireDefault(require("./RowType1"));
var _RowPlusMinus = _interopRequireDefault(require("./RowPlusMinus"));
var _RowSma = _interopRequireDefault(require("./RowSma"));
var _RowRsi = _interopRequireDefault(require("./RowRsi"));
var _RowMfi = _interopRequireDefault(require("./RowMfi"));
var _ModalMenu = require("./ModalMenu.Style");
var _jsxRuntime = require("react/jsx-runtime");
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
  const [isChanges, addChanges, removeChanges] = (0, _useAddSeriaBy.default)(FN_DIFF, getChart),
    [isGrowthRate, addGrowthRate, removeGrowtRate] = (0, _useAddSeriaBy.default)(FN_ROC, getChart),
    [isNormalize, addNormalize, removeNormalize] = (0, _useAddSeriaBy.default)(FN_NORM, getChart),
    [_isSma, _isMfi, _isMomAth, _isRsi] = (0, _uiApi.useMemo)(() => {
      const {
          zhConfig
        } = config,
        _isMfi = !!config.zhIsMfi,
        {
          btTitle
        } = (config.zhMiniConfigs || [])[0] || {};
      return [!(zhConfig || {}).isWithoutSma, _isMfi, !!config.zhIsMomAth, _isMfi || (btTitle || '').indexOf('Volume') !== -1];
    }, [config]),
    [isMomAth, _addMomAth, _removeMomAth] = (0, _useMomAth.default)(_isMomAth, getChart, onAddMfi, onRemoveMfi);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType.default, {
        is: isChanges,
        caption: "Changes Between",
        onMinus: removeChanges,
        onPlus: addChanges
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType.default, {
        is: isGrowthRate,
        caption: "Growth Rate",
        onMinus: removeGrowtRate,
        onPlus: addGrowthRate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus.default, {
        is: isNormalize,
        caption: NORM_CAPTION_EL,
        onMinus: removeNormalize,
        onPlus: addNormalize
      }), _isSma && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowSma.default, {
        config: config,
        getChart: getChart
      }), _isRsi && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowRsi.default, {
        config: config,
        getChart: getChart
      }), _isMfi && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowMfi.default, {
        getChart: getChart,
        onAddMfi: onAddMfi,
        onRemoveMfi: onRemoveMfi
      }), _isMomAth && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowPlusMinus.default, {
        is: isMomAth,
        caption: "MOM(1) & ATH",
        onPlus: _addMomAth,
        onMinus: _removeMomAth
      })]
    })
  });
};
var _default = ModalMenuIndicator;
exports.default = _default;
//# sourceMappingURL=ModalMenuIndicator.js.map