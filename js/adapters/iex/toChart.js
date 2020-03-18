"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _AdapterStockFn = _interopRequireDefault(require("../AdapterStockFn"));

var crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf,
    valueMoving = _AdapterFn["default"].valueMoving,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend;
var toSeriesData = _AdapterStockFn["default"].toSeriesData;

var _crZhConfig = function _crZhConfig(id, option, data) {
  var one = option.one,
      two = option.two,
      dataSource = option.dataSource;
  return {
    dataSource: dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: one,
    itemCaption: one,
    itemConf: (0, _extends2["default"])({
      _itemKey: id
    }, crItemConf(option), {}, crValueConf(data), {
      symbol: one,
      dfPeriod: two,
      dataSource: dataSource
    }),
    legend: stockSeriesLegend()
  };
};

var _crInfo = function _crInfo(title) {
  return {
    name: title,
    frequency: "Daily"
  };
};

var _crId = function _crId(_ref) {
  var one = _ref.one,
      two = _ref.two;
  return one + '_' + two;
};

var toChart = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        _id = _crId(option),
        dataOption = toSeriesData(json, {
      isNotZoomToMinMax: isNotZoomToMinMax,
      isDrawDeltaExtrems: isDrawDeltaExtrems
    }),
        data = dataOption.data,
        dataMfi = dataOption.dataMfi,
        config = (0, _ConfigBuilder["default"])().stockConfig(_id, dataOption).addCaption(title).add({
      valueMoving: valueMoving(data),
      info: _crInfo(title),
      zhConfig: _crZhConfig(_id, option, data)
    }).addZhPoints(dataMfi).toConfig();

    return config;
  },
  toSeries: function toSeries(json, option) {
    var _id = _crId(option),
        _toSeriesData = toSeriesData(json, {
      isAllSeries: false
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder["default"])().initSeria().addPoints(_id, data).toSeria();
  }
};
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toChart.js.map