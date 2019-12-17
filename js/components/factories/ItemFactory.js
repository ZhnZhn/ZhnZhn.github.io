"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _ComponentActions = _interopRequireDefault(require("../../flux/actions/ComponentActions"));

var _ChartActions = _interopRequireDefault(require("../../flux/actions/ChartActions"));

var _Type = require("../../constants/Type");

var _Items = _interopRequireDefault(require("../items/Items"));

var _rCrItem2;

var _crAreaChart = function _crAreaChart(_ref) {
  var store = _ref.store,
      config = _ref.config,
      index = _ref.index,
      option = _ref.option,
      props = _ref.props;
  var _config$zhConfig = config.zhConfig,
      zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
      key = zhConfig.key,
      _zhConfig$id = zhConfig.id,
      id = _zhConfig$id === void 0 ? "Id:" + index : _zhConfig$id,
      chartType = option.chartType;
  return _react["default"].createElement(_Items["default"].AreaChart, (0, _extends2["default"])({
    key: key || id,
    chartType: chartType,
    caption: id,
    config: config,
    onSetActive: _ComponentActions["default"].setActiveCheckbox,
    onShowConfigDialog: _ComponentActions["default"].showConfigChart,
    onAddToWatch: _ComponentActions["default"].showAddToWatch
  }, props, {
    crValueMoving: _ChartFn["default"].crValueMoving,
    onToTop: _ChartActions["default"].toTop.bind(null, chartType, id),
    onCopy: _ChartActions["default"].copy,
    onPasteToDialog: _ComponentActions["default"].showPasteTo,
    onZoom: _ComponentActions["default"].zoom,
    getCopyFromChart: store.getCopyFromChart.bind(store),
    ChartFn: _ChartFn["default"]
  }));
};

var _crMapChart = function _crMapChart(_ref2) {
  var store = _ref2.store,
      config = _ref2.config,
      index = _ref2.index,
      option = _ref2.option,
      props = _ref2.props;
  var _config$zhConfig2 = config.zhConfig,
      zhConfig = _config$zhConfig2 === void 0 ? {} : _config$zhConfig2,
      _zhConfig$id2 = zhConfig.id,
      id = _zhConfig$id2 === void 0 ? "Id:" + index : _zhConfig$id2,
      _zhConfig$key = zhConfig.key,
      key = _zhConfig$key === void 0 ? index : _zhConfig$key,
      chartType = option.chartType;
  return _react["default"].createElement(_Items["default"].MapChart, (0, _extends2["default"])({
    key: key,
    chartType: chartType,
    caption: id,
    config: config
  }, props));
};

var _fItem = function _fItem(Comp) {
  return function (_ref3) {
    var _ref3$config = _ref3.config,
        config = _ref3$config === void 0 ? {} : _ref3$config,
        props = _ref3.props;
    return _react["default"].createElement(Comp, (0, _extends2["default"])({
      key: config.id,
      config: config
    }, props));
  };
};

var _rCrItem = (_rCrItem2 = {
  DF: _crAreaChart
}, _rCrItem2[_Type.CompItemType.EUROSTAT_MAP] = _crMapChart, _rCrItem2[_Type.CompItemType.COIN_INFO] = _fItem(_Items["default"].CoinInfo), _rCrItem2[_Type.CompItemType.TABLE] = _fItem(_Items["default"].Table), _rCrItem2[_Type.CompItemType.ALPHA_PERF] = _fItem(_Items["default"].AlphaPerf), _rCrItem2);

var ItemFactory = {
  createItem: function createItem(_ref4) {
    var store = _ref4.store,
        config = _ref4.config,
        index = _ref4.index,
        option = _ref4.option,
        props = _ref4.props;

    var _ref5 = config || {},
        zhCompType = _ref5.zhCompType,
        _fnCreate = _rCrItem[zhCompType] || _rCrItem.DF;

    return _fnCreate({
      store: store,
      config: config,
      index: index,
      option: option,
      props: props
    });
  }
};
var _default = ItemFactory;
exports["default"] = _default;
//# sourceMappingURL=ItemFactory.js.map