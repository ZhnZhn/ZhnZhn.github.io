'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _IndicatorSma = require('../IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" + "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>";

var _crInfo = function _crInfo(caption) {
  return {
    description: DESCR,
    frequency: "Daily",
    name: caption,
    newest_available_date: _DateUtils2.default.getFromDate(0),
    oldest_available_date: _DateUtils2.default.getFromDate(2)
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

var _crSeriesData = function _crSeriesData(chartId) {
  var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isAllSeries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var _json$results = json.results,
      results = _json$results === undefined ? [] : _json$results,
      data = [],
      dataOpen = [],
      dataHigh = [],
      dataLow = [],
      dataVolume = [],
      dataVolumeColumn = [],
      dataATH = [],
      dataMfi = [];

  var _prevClose = void 0,
      minClose = Number.POSITIVE_INFINITY,
      maxClose = Number.NEGATIVE_INFINITY;
  results.forEach(function (item) {
    var _item$tradingDay = item.tradingDay,
        tradingDay = _item$tradingDay === undefined ? '' : _item$tradingDay,
        open = item.open,
        high = item.high,
        low = item.low,
        close = item.close,
        volume = item.volume,
        _date = _AdapterFn2.default.ymdToUTC(tradingDay);

    data.push([_date, close]);

    if (isAllSeries) {
      if (minClose > close) {
        minClose = close;
      }
      if (maxClose < close) {
        maxClose = close;
      }

      dataOpen.push([_date, open]);
      dataHigh.push([_date, high]);
      dataLow.push([_date, low]);
      dataVolume.push([_date, volume]);
      dataVolumeColumn.push(_AdapterFn2.default.volumeColumnPoint({
        open: open, close: close, volume: volume, date: _date,
        option: { _high: high, _low: low }
      }));
      dataMfi.push([tradingDay, close, high, low, close, volume]);
      if (typeof _prevClose !== 'undefined') {
        dataATH.push(_AdapterFn2.default.athPoint({
          date: _date, prevClose: _prevClose, open: open
        }));
      }
      _prevClose = close;
    }
  });

  return {
    data: data, minClose: minClose, maxClose: maxClose,
    dataOpen: dataOpen, dataHigh: dataHigh, dataLow: dataLow,
    dataVolume: dataVolume, dataVolumeColumn: dataVolumeColumn,
    dataATH: dataATH, dataMfi: dataMfi
  };
};

var _crChartId = function _crChartId(option) {
  var _option$stock = option.stock,
      stock = _option$stock === undefined ? {} : _option$stock,
      _stock$value = stock.value,
      value = _stock$value === undefined ? '' : _stock$value;

  return 'B/' + value;
};

var _crConfig = function _crConfig(json, option) {
  var _option$stock2 = option.stock,
      stock = _option$stock2 === undefined ? {} : _option$stock2,
      _stock$caption = stock.caption,
      caption = _stock$caption === undefined ? '' : _stock$caption,
      _stock$value2 = stock.value,
      value = _stock$value2 === undefined ? '' : _stock$value2,
      _chartId = _crChartId(option),
      _crSeriesData2 = _crSeriesData(_chartId, json),
      data = _crSeriesData2.data,
      minClose = _crSeriesData2.minClose,
      maxClose = _crSeriesData2.maxClose,
      dataOpen = _crSeriesData2.dataOpen,
      dataHigh = _crSeriesData2.dataHigh,
      dataLow = _crSeriesData2.dataLow,
      dataVolume = _crSeriesData2.dataVolume,
      dataVolumeColumn = _crSeriesData2.dataVolumeColumn,
      dataATH = _crSeriesData2.dataATH,
      dataMfi = _crSeriesData2.dataMfi,
      config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(caption).addTooltip(_Tooltip2.default.fnBasePointFormatter).add({
    valueMoving: _AdapterFn2.default.valueMoving(data),
    info: _crInfo(caption),
    zhConfig: _crZhConfig(_chartId, value),
    zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
    zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries
  }).addZhVolumeConfig(_chartId, dataVolumeColumn, dataVolume).addZhATHConfig(_chartId, dataATH).addZhPoints(dataMfi, _IndicatorSma.fnGetConfigMfi).setMinMax(minClose, maxClose).setStockSerias(_chartId, data, dataHigh, dataLow, dataOpen).toConfig();

  return {
    config: config,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  };
};

var BarchartAdapter = {
  toConfig: function toConfig(json, option) {
    var _config = _crConfig(json, option);
    return _config;
  },
  toSeries: function toSeries(json, option) {
    var parentId = option.parentId,
        _id = parentId + '_' + _crChartId(option),
        _crSeriesData3 = _crSeriesData(_id, json, false),
        data = _crSeriesData3.data;

    return (0, _ConfigBuilder2.default)().initBaseSeria().addPoints(_id, data).toConfig();
  }
};

exports.default = BarchartAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\barchart\BarchartAdapter.js.map