'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _QuandlFn = require('../QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _IndicatorSma = require('../IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" + "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>";

var _createCloseSeries = function _createCloseSeries(config, _ref, chartId) {
  var _ref$results = _ref.results,
      results = _ref$results === undefined ? [] : _ref$results;

  var _data = [],
      _dataVolume = [],
      _dataVolumeColumn = [],
      _dataATH = [],
      _dataMfi = [];
  var _prevClose = void 0;
  var _minClose = Number.POSITIVE_INFINITY;
  var _maxClose = Number.NEGATIVE_INFINITY;
  results.forEach(function (item) {
    var _item$tradingDay = item.tradingDay,
        tradingDay = _item$tradingDay === undefined ? '' : _item$tradingDay,
        close = item.close,
        volume = item.volume,
        open = item.open,
        high = item.high,
        low = item.low,
        _date = _AdapterFn2.default.ymdToUTC(tradingDay);

    if (_minClose > close) {
      _minClose = close;
    }
    if (_maxClose < close) {
      _maxClose = close;
    }

    _data.push([_date, close]);
    _dataVolume.push([_date, volume]);
    _dataVolumeColumn.push(_AdapterFn2.default.volumeColumnPoint({
      open: open, close: close, volume: volume, date: _date,
      option: { _high: high, _low: low }
    }));
    _dataMfi.push([tradingDay, close, high, low, close, volume]);
    if (typeof _prevClose !== 'undefined') {
      _dataATH.push(_AdapterFn2.default.athPoint({
        date: _date, prevClose: _prevClose, open: open
      }));
    }
    _prevClose = close;
  });

  config.series[0] = {
    data: _data,
    type: 'area',
    lineWidth: 1
  };

  Object.assign(config, {
    valueMoving: _QuandlFn2.default.createValueMovingFromSeria(_data),
    zhVolumeConfig: _ChartConfig2.default.fIndicatorVolumeConfig(chartId, _dataVolumeColumn, _dataVolume),
    zhATHConfig: _ChartConfig2.default.fIndicatorATHConfig(chartId, _dataATH),
    zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
    zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries,
    zhPoints: _dataMfi,
    zhIsMfi: true,
    zhFnGetMfiConfig: _IndicatorSma.fnGetConfigMfi
  });

  config.chart.spacingTop = 25;

  var plotLines = config.yAxis.plotLines;
  plotLines[0].value = _maxClose;
  plotLines[0].label.text = '' + _ChartConfig2.default.fnNumberFormat(_maxClose);
  plotLines[1].value = _minClose;
  plotLines[1].label.text = '' + _ChartConfig2.default.fnNumberFormat(_minClose);

  var _min = _Chart2.default.calcMinY({
    minPoint: _minClose, maxPoint: _maxClose
  });
  Object.assign(config.yAxis, {
    min: _min,
    maxPadding: 0.15,
    minPadding: 0.15,
    endOnTick: false,
    startOnTick: false
  });
};

var _createAreaConfig = function _createAreaConfig(json, option) {
  var config = _ChartConfig2.default.fBaseAreaConfig(),
      _option$stock = option.stock,
      stock = _option$stock === undefined ? {} : _option$stock,
      _stock$caption = stock.caption,
      caption = _stock$caption === undefined ? '' : _stock$caption,
      _stock$value = stock.value,
      value = _stock$value === undefined ? '' : _stock$value,
      _chartId = 'B/' + value;


  config.title = _Chart2.default.fTitle({ text: caption, y: -10 });
  _createCloseSeries(config, json, _chartId);

  config.info = {
    description: DESCR,
    frequency: "daily",
    name: caption,
    newest_available_date: "",
    oldest_available_date: ""
  };
  config.zhConfig = {
    columnName: "Close",
    dataColumn: 4,
    dataSource: "Barchart Market Data Solutions",
    id: _chartId,
    isWithLegend: false,
    key: '' + value,
    linkFn: "NASDAQ"
  };

  return {
    config: config,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  };
};

var BarchartAdapter = {
  toConfig: function toConfig(json, option) {
    var _config = _createAreaConfig(json, option);
    return _config;
  },
  toSeries: function toSeries(json, option) {
    var seria = _ChartConfig2.default.fSeries();
    seria.zhSeriaId = 'Empty_Seria';
    seria.zhValueText = 'Empty Seria';
    return seria;
  }
};

exports.default = BarchartAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\barchart\BarchartAdapter.js.map