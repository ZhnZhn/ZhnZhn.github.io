"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _IndicatorBuilder = require("../../charts/IndicatorBuilder");
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _ModalMenu = require("./ModalMenu.Style");
var _RowTypeA = _interopRequireDefault(require("./RowTypeA"));
var _RowTypeB = _interopRequireDefault(require("./RowTypeB"));
var _jsxRuntime = require("react/jsx-runtime");
const DF_POWER_BY_10 = 0,
  _isNumber = n => typeof n === 'number' && n - n === 0,
  _isPowerBy = config => {
    var _config$plotOptions;
    return !(config != null && (_config$plotOptions = config.plotOptions) != null && (_config$plotOptions = _config$plotOptions.bar) != null && (_config$plotOptions = _config$plotOptions.dataLabels) != null && _config$plotOptions.enabled);
  };
const ModalMenuInd2 = _ref => {
  let {
    style,
    isShow,
    onClose,
    getChart,
    config
  } = _ref;
  const _hasPowerBy10 = (0, _useRefInit.default)(() => _isPowerBy(config)),
    _refPowerBy10 = (0, _uiApi.useRef)(DF_POWER_BY_10),
    _onPowerBy10 = () => {
      const _by = parseFloat(_refPowerBy10.current.getValue());
      if (_isNumber(_by)) {
        (0, _IndicatorBuilder.powerBy10)(getChart(), _by);
        return true;
      }
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    style: {
      ..._ModalMenu.S_MODAL_MENU,
      ...style
    },
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: _ModalMenu.S_MENU_PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA.default, {
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
        caption: "S1*Power of 10",
        initValue: DF_POWER_BY_10,
        min: -9,
        max: 9,
        maxLength: 2,
        onAdd: _onPowerBy10
      })]
    })
  });
};
var _default = exports.default = ModalMenuInd2;
//# sourceMappingURL=ModalMenuInd2.js.map