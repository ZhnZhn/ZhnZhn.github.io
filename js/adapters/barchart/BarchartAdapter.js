'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _AdapterStockFn = require('../AdapterStockFn');

var _AdapterStockFn2 = _interopRequireDefault(_AdapterStockFn);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _IndicatorSma = require('../IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" + "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>";

var toSeriesData = _AdapterStockFn2.default.toSeriesData;


var _crInfo = function _crInfo(caption) {
  return {
    description: DESCR,
    frequency: "Daily",
    name: caption,
    newest_available_date: _DateUtils2.default.getFromDate(0),
    oldest_available_date: _DateUtils2.default.getFromDate(1)
  };
};

var _crZhConfig = function _crZhConfig(id, value) {
  return {
    columnName: "Close",
    dataSource: "Barchart Market Data Solutions",
    id: id,
    key: value,
    linkFn: "NASDAQ",
    isWithLegend: true,
    legend: _AdapterFn2.default.stockSeriesLegend()
  };
};

var _crChartId = function _crChartId(option) {
  var _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value;

  return 'B/' + value;
};

var _crConfig = function _crConfig() {
  var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var option = arguments[1];

  var _option$value2 = option.value,
      value = _option$value2 === undefined ? '' : _option$value2,
      _option$title = option.title,
      title = _option$title === undefined ? '' : _option$title,
      _chartId = _crChartId(option),
      dataOption = toSeriesData(_chartId, json.results, {
    pnDate: 'tradingDay'
  }),
      data = dataOption.data,
      dataMfi = dataOption.dataMfi,
      config = (0, _ConfigBuilder2.default)().initBaseStock(_chartId, dataOption).addCaption(title).add({
    valueMoving: _AdapterFn2.default.valueMoving(data),
    info: _crInfo(title),
    zhConfig: _crZhConfig(_chartId, value),
    zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
    zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries
  }).addZhPoints(dataMfi, _IndicatorSma.fnGetConfigMfi).toConfig();

  return {
    config: config
    //isDrawDeltaExtrems:false,
    //isNotZoomToMinMax:false
  };
};

var BarchartAdapter = {
  toConfig: function toConfig(json, option) {
    var _config = _crConfig(json, option);
    return _config;
  },
  toSeries: function toSeries() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var option = arguments[1];
    var parentId = option.parentId,
        _id = parentId + '_' + _crChartId(option),
        _toSeriesData = toSeriesData(_id, json.results, {
      isAllSeries: false,
      pnDate: 'tradingDay'
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder2.default)().initBaseSeria().addPoints(_id, data).toConfig();
  }
};

exports.default = BarchartAdapter;
//# sourceMappingURL=BarchartAdapter.js.map