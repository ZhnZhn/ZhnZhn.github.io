'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _AdapterStockFn = require('../AdapterStockFn');

var _AdapterStockFn2 = _interopRequireDefault(_AdapterStockFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valueMoving = _AdapterFn2.default.valueMoving,
    stockSeriesLegend = _AdapterFn2.default.stockSeriesLegend,
    crZhFn = _AdapterFn2.default.crZhFn,
    fnGetConfigMfi = _AdapterFn2.default.fnGetConfigMfi;
var toSeriesData = _AdapterStockFn2.default.toSeriesData;


var _crZhConfig = function _crZhConfig(id, option) {
  var value = option.value,
      dataSource = option.dataSource;

  return {
    dataSource: dataSource,
    id: id,
    key: value,
    linkFn: "NASDAQ",
    item: value,
    isWithLegend: true,
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
  var value = _ref.value;
  return value;
};

var toChart = {
  toConfig: function toConfig(json, option) {
    var title = option.title,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        _id = _crId(option),
        dataOption = toSeriesData(_id, json, {
      isNotZoomToMinMax: isNotZoomToMinMax
    }),
        data = dataOption.data,
        dataMfi = dataOption.dataMfi,
        config = (0, _ConfigBuilder2.default)().stockConfig(_id, dataOption).addCaption(title).add((0, _extends3.default)({
      valueMoving: valueMoving(data),
      info: _crInfo(title),
      zhConfig: _crZhConfig(_id, option)
    }, crZhFn())).addZhPoints(dataMfi, fnGetConfigMfi).toConfig();

    return config;
  },
  toSeries: function toSeries(json, option) {
    var _id = _crId(option),
        _toSeriesData = toSeriesData(_id, json, {
      isAllSeries: false
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder2.default)().initSeria().addPoints(_id, data).toSeria();
  }
};

exports.default = toChart;
//# sourceMappingURL=toChart.js.map