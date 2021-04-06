"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _Items = _interopRequireDefault(require("../items/Items"));

var _rCrItem2;

var crValueMoving = _ChartFn["default"].crValueMoving,
    crId = _ChartFn["default"].crId;

var _getIdKey = function _getIdKey(config, index) {
  var zhConfig = config.zhConfig,
      _ref = zhConfig || {},
      id = _ref.id,
      key = _ref.key;

  return [id || "Id:" + index, key || id || crId()];
};

var _crAreaChart = function _crAreaChart(_ref2) {
  var config = _ref2.config,
      index = _ref2.index,
      chartType = _ref2.chartType,
      props = _ref2.props,
      store = _ref2.store;

  var _getIdKey2 = _getIdKey(config, index),
      id = _getIdKey2[0],
      key = _getIdKey2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Items["default"].AreaChart, (0, _extends2["default"])({
    chartType: chartType,
    caption: id,
    config: config,
    onSetActive: _ComponentActions["default"].setActiveCheckbox,
    onShowConfigDialog: _ComponentActions["default"].showConfigChart,
    onAddToWatch: _ComponentActions["default"].showAddToWatch
  }, props, {
    crValueMoving: crValueMoving,
    onToTop: _ChartActions["default"].toTop.bind(null, chartType, id),
    onCopy: _ChartActions["default"].copy,
    onPasteToDialog: _ComponentActions["default"].showPasteTo,
    onZoom: _ComponentActions["default"].zoom,
    getCopyFromChart: store.getCopyFromChart.bind(store),
    ChartFn: _ChartFn["default"]
  }), key);
};

var _crMapChart = function _crMapChart(_ref3) {
  var config = _ref3.config,
      index = _ref3.index,
      chartType = _ref3.chartType,
      props = _ref3.props;

  var _getIdKey3 = _getIdKey(config, index),
      id = _getIdKey3[0],
      key = _getIdKey3[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Items["default"].MapChart, (0, _extends2["default"])({
    chartType: chartType,
    caption: id,
    config: config
  }, props), key);
};

var _fItem = function _fItem(Comp) {
  return function (_ref4) {
    var _ref4$config = _ref4.config,
        config = _ref4$config === void 0 ? {} : _ref4$config,
        props = _ref4.props;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, (0, _extends2["default"])({
      config: config
    }, props), config.id);
  };
};

var _rCrItem = (_rCrItem2 = {
  DF: _crAreaChart
}, _rCrItem2[_Type.CompItemType.EUROSTAT_MAP] = _crMapChart, _rCrItem2[_Type.CompItemType.TABLE] = _fItem(_Items["default"].Table), _rCrItem2[_Type.CompItemType.ALPHA_PERF] = _fItem(_Items["default"].AlphaPerf), _rCrItem2[_Type.CompItemType.INFO_ITEM] = _fItem(_Items["default"].InfoItem), _rCrItem2[_Type.CompItemType.TW_LIST] = _fItem(_Items["default"].TwList), _rCrItem2);

var ItemFactory = {
  /* { config, index, chartType, props, store } */
  crItem: function crItem(itemOptions) {
    var config = itemOptions.config,
        _ref5 = config || {},
        zhCompType = _ref5.zhCompType,
        _crItem = _rCrItem[zhCompType] || _rCrItem.DF;

    return _crItem(itemOptions);
  }
};
var _default = ItemFactory;
exports["default"] = _default;
//# sourceMappingURL=ItemFactory.js.map