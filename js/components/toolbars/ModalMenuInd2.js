"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _IndicatorBuilder = _interopRequireDefault(require("../../charts/IndicatorBuilder"));

var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));

var _ModalMenu = _interopRequireDefault(require("./ModalMenu.Style"));

var _RowTypeA = _interopRequireDefault(require("./RowTypeA"));

var _RowTypeB = _interopRequireDefault(require("./RowTypeB"));

var addCategoryRateTo = _IndicatorBuilder["default"].addCategoryRateTo,
    addCategoryDiffTo = _IndicatorBuilder["default"].addCategoryDiffTo,
    addCategoryRocTo = _IndicatorBuilder["default"].addCategoryRocTo,
    powerBy10 = _IndicatorBuilder["default"].powerBy10;
var DF_POWER_BY_10 = 0;
var S = {
  PANE: {
    margin: '6px 10px 6px 6px'
  }
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _isPowerBy = function _isPowerBy(config) {
  var _config$plotOptions, _config$plotOptions$b, _config$plotOptions$b2;

  return !(config == null ? void 0 : (_config$plotOptions = config.plotOptions) == null ? void 0 : (_config$plotOptions$b = _config$plotOptions.bar) == null ? void 0 : (_config$plotOptions$b2 = _config$plotOptions$b.dataLabels) == null ? void 0 : _config$plotOptions$b2.enabled);
};

var ModalMenuInd2 = function ModalMenuInd2(_ref) {
  var style = _ref.style,
      isShow = _ref.isShow,
      onClose = _ref.onClose,
      getChart = _ref.getChart,
      config = _ref.config;

  var _hasPowerBy10 = (0, _useRefInit["default"])(function () {
    return _isPowerBy(config);
  }),
      _refPowerBy10 = (0, _react.useRef)(DF_POWER_BY_10),
      _onPowerBy10 = function _onPowerBy10() {
    var _by = parseFloat(_refPowerBy10.current.getValue());

    if (_isNumber(_by)) {
      powerBy10(getChart(), _by);
      return true;
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup["default"], {
    style: (0, _extends2["default"])({}, _ModalMenu["default"].ROOT, style),
    isShow: isShow,
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.PANE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA["default"], {
        caption: "Rate (S1/S2)",
        mathFn: addCategoryRateTo,
        getChart: getChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA["default"], {
        caption: "Diff (S1-S2)",
        mathFn: addCategoryDiffTo,
        getChart: getChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeA["default"], {
        caption: "ROC (S1 from S2)",
        mathFn: addCategoryRocTo,
        getChart: getChart
      }), _hasPowerBy10 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTypeB["default"], {
        forwardRef: _refPowerBy10,
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

var _default = ModalMenuInd2;
exports["default"] = _default;
//# sourceMappingURL=ModalMenuInd2.js.map