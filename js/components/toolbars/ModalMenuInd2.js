"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("../hooks/useProperty");
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _ModalPopup = require("../zhn-moleculs/ModalPopup");
var _crModalPopup = _interopRequireDefault(require("./crModalPopup"));
var _RowTypeA = _interopRequireDefault(require("./RowTypeA"));
var _RowTypeB = _interopRequireDefault(require("./RowTypeB"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MENU_PANE = {
    margin: '4px 10px 8px 8px'
  },
  DF_POWER_BY_10 = 0,
  _isPowerBy = config => !config?.plotOptions?.bar?.dataLabels?.enabled;
const ModalMenuInd2View = _ref => {
  let {
    style,
    isShow,
    onClose,
    getChart,
    config
  } = _ref;
  const refFirstItem = (0, _ModalPopup.useModalPopup)()[0],
    _hasPowerBy10 = (0, _useProperty.useRefInit)(() => _isPowerBy(config)),
    _refPowerBy10 = (0, _uiApi.useRef)(DF_POWER_BY_10),
    _onPowerBy10 = () => {
      const _by = parseFloat((0, _uiApi.getInputValue)(_refPowerBy10));
      if ((0, _uiApi.isNumber)(_by)) {
        (0, _IndicatorBuilder.powerBy10)(getChart(), _by);
        return !0;
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_MENU_PANE,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA.default, {
      refEl: refFirstItem,
      caption: "Rate (S1/S2)",
      mathFn: _IndicatorBuilder.addCategoryRateTo,
      getChart: getChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA.default, {
      caption: "Diff (S1-S2)",
      mathFn: _IndicatorBuilder.addCategoryDiffTo,
      getChart: getChart
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA.default, {
      caption: "ROC (S1 from S2)",
      mathFn: _IndicatorBuilder.addCategoryRocTo,
      getChart: getChart
    }), _hasPowerBy10 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeB.default, {
      refEl: _refPowerBy10,
      caption: "S1*PowerOf 10",
      initValue: DF_POWER_BY_10,
      min: -9,
      max: 9,
      onAdd: _onPowerBy10
    })]
  });
};
var _default = exports.default = (0, _crModalPopup.default)(ModalMenuInd2View);
//# sourceMappingURL=ModalMenuInd2.js.map