'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _AdapterStockFn = require('../AdapterStockFn');

var _AdapterStockFn2 = _interopRequireDefault(_AdapterStockFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valueMoving = _AdapterFn2.default.valueMoving,
    stockSeriesLegend = _AdapterFn2.default.stockSeriesLegend;
var toSeriesData = _AdapterStockFn2.default.toSeriesData;


var _crZhConfig = function _crZhConfig(id, option) {
  var one = option.one,
      dataSource = option.dataSource;

  return {
    dataSource: dataSource,
    id: id,
    key: id,
    linkFn: "NASDAQ",
    item: one,
    itemCaption: one,
    isWithLegend: true,
    isWithoutAdd: true,
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
        config = (0, _ConfigBuilder2.default)().stockConfig(_id, dataOption).addCaption(title).add({
      valueMoving: valueMoving(data),
      info: _crInfo(title),
      zhConfig: _crZhConfig(_id, option)
    }).addZhPoints(dataMfi).toConfig();

    return config;
  },
  toSeries: function toSeries(json, option) {
    var _id = _crId(option),
        _toSeriesData = toSeriesData(json, {
      isAllSeries: false
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder2.default)().initSeria().addPoints(_id, data).toSeria();
  }
};

exports.default = toChart;
//# sourceMappingURL=toChart.js.map