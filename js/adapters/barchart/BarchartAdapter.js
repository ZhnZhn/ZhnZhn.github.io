'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _IndicatorSma = require('../IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESCR = "Copyright © 2017. All <a href='https://www.barchartmarketdata.com'>market data</a> provided by Barchart Market Data Solutions.<br><br>" + "BATS market data is at least 15-minutes delayed. Forex market data is at least 10-minutes delayed. AMEX, NASDAQ, NYSE and futures market data (CBOT, CME, COMEX and NYMEX) is end-of-day. Information is provided 'as is' and solely for informational purposes, not for trading purposes or advice, and is delayed. To see all exchange delays and terms of use, please see our <a href='https://www.barchart.com/agreement.php'>disclaimer.</a>";

var _createCloseSeries = function _createCloseSeries(config, _ref, chartId) {
  var _ref$results = _ref.results,
      results = _ref$results === undefined ? [] : _ref$results;

  var _data = [],
      _dataOpen = [],
      _dataHigh = [],
      _dataLow = [],
      _dataVolume = [],
      _dataVolumeColumn = [],
      _dataATH = [],
      _dataMfi = [];
  var _prevClose = void 0,
      _minClose = Number.POSITIVE_INFINITY,
      _maxClose = Number.NEGATIVE_INFINITY;
  results.forEach(function (item) {
    var _item$tradingDay = item.tradingDay,
        tradingDay = _item$tradingDay === undefined ? '' : _item$tradingDay,
        open = item.open,
        high = item.high,
        low = item.low,
        close = item.close,
        volume = item.volume,
        _date = _AdapterFn2.default.ymdToUTC(tradingDay);

    if (_minClose > close) {
      _minClose = close;
    }
    if (_maxClose < close) {
      _maxClose = close;
    }

    _data.push([_date, close]);
    _dataOpen.push([_date, open]);
    _dataHigh.push([_date, high]);
    _dataLow.push([_date, low]);
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

  _ChartConfig2.default.setStockSerias(config, _data, _dataHigh, _dataLow, _dataOpen, chartId);

  Object.assign(config, {
    valueMoving: _AdapterFn2.default.valueMoving(_data),
    zhVolumeConfig: _ChartConfig2.default.fIndicatorVolumeConfig(chartId, _dataVolumeColumn, _dataVolume),
    zhATHConfig: _ChartConfig2.default.fIndicatorATHConfig(chartId, _dataATH),
    zhFnAddSeriesSma: _IndicatorSma.fnAddSeriesSma,
    zhFnRemoveSeries: _IndicatorSma.fnRemoveSeries,
    zhPoints: _dataMfi,
    zhIsMfi: true,
    zhFnGetMfiConfig: _IndicatorSma.fnGetConfigMfi
  });

  config.chart.spacingTop = 25;

  _ChartConfig2.default.setMinMax(config, _minClose, _maxClose);

  Object.assign(config.xAxis, {
    crosshair: _Chart2.default.fCrosshair()
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


  Object.assign(config, {
    title: _Chart2.default.fTitle({ text: caption, y: _Chart2.default.STACKED_TITLE_Y }),
    subtitle: _Chart2.default.fSubtitle({ y: _Chart2.default.STACKED_SUBTITLE_Y }),
    tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnBasePointFormatter),
    info: {
      description: DESCR,
      frequency: "daily",
      name: caption,
      newest_available_date: _DateUtils2.default.getFromDate(0),
      oldest_available_date: _DateUtils2.default.getFromDate(2)
    },
    zhConfig: {
      columnName: "Close",
      dataColumn: 4,
      dataSource: "Barchart Market Data Solutions",
      id: _chartId,
      key: '' + value,
      linkFn: "NASDAQ",
      isWithLegend: true,
      legend: _AdapterFn2.default.stockSeriesLegend()
    }
  });

  _createCloseSeries(config, json, _chartId);

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
    Object.assign(seria, {
      zhSeriaId: 'Empty_Seria',
      zhValueText: 'Empty Seria'
    });
    return seria;
  }
};

exports.default = BarchartAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\barchart\BarchartAdapter.js.map