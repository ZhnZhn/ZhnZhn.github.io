'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadConfig;

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _DialogType = require('../../constants/DialogType');

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loadData = function loadData(dataColumn, chartType, browserType, option, onCompleted) {
  if (_ChartStore2.default.isLoadToChart()) {
    loadToChart(dataColumn, chartType, browserType, option);
  } else {
    loadToChartComp(dataColumn, chartType, browserType, option, onCompleted);
  }
};

var loadToChart = function loadToChart(dataColumn, chartType, browserType, option) {
  var chartId = option.value;
  option.apiKey = _ChartStore2.default.getQuandlKey();
  fetch(_QuandlApi2.default.getRequestUrl(option)).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (!json.quandl_error) {
      var series = _QuandlAdapter2.default.toSeries(json, dataColumn, chartId);

      var chart = _ChartStore2.default.getActiveChart();
      var options = chart.options;

      _ChartStore2.default.getActiveChart().addSeries(series, true, true);

      //12symbols
      var seriesText = chartId.length > 12 ? chartId.substring(0, 12) : chartId,
          seriesCount = options.zhSeries.count,
          row = Math.floor(seriesCount / 3),
          x = 110 + 100 * seriesCount - row * 300,
          y = 55 + 15 * row;

      chart.renderer.text(seriesText, x, y).css({ color: options.colors[series._colorIndex] }).add();
      options.zhSeries.count += 1;
    } else {
      console.log('%cQuandl Error Message:', 'color:red;');
      console.log('%c' + json.quandl_error.message, 'color:red;');
    }
  }).catch(function (error) {
    console.log('%c' + error.message, 'color:red;');
  });
};

var loadToChartComp = function loadToChartComp(dataColumn, chartType, browserType, option, onCompleted) {
  var chartId = option.value;
  if (!_ChartStore2.default.isChartExist(chartType, chartId)) {
    option.apiKey = _ChartStore2.default.getQuandlKey();
    fetch(_QuandlApi2.default.getRequestUrl(option)).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (!json.quandl_error) {
        var _QuandlAdapter$toConf = _QuandlAdapter2.default.toConfig(json, dataColumn);

        var config = _QuandlAdapter$toConf.config;
        var configVolume = _QuandlAdapter$toConf.configVolume;

        config.stockTicket = chartId;
        config.chart.zhId = chartId;
        onCompleted(chartType, browserType, config);
      } else {
        console.log('%cQuandl Error Message:', 'color:red;');
        console.log('%c' + json.quandl_error.message, 'color:red;');
      }
    }).catch(function (error) {
      console.log('%c' + error.message, 'color:red;');
    });
  } else {
    console.log('%cChart for this type has already existed in a container. Close it and load again.', 'color:red;');
  }
};

var fnLoad1 = loadData.bind(null, 1);
var fnLoad4 = loadData.bind(null, 4);

var LoadConfig = (_LoadConfig = {}, _defineProperty(_LoadConfig, _ChartType2.default.QUANDL_CURRENCY_HISTORY, fnLoad1), _defineProperty(_LoadConfig, _ChartType2.default.QUANDL_COMMODITY_PRICE, fnLoad1), _defineProperty(_LoadConfig, _ChartType2.default.QUANDL_WORLDBANK_PRICE, fnLoad1), _defineProperty(_LoadConfig, _ChartType2.default.QUANDL_WIKI_STOCK, fnLoad4), _defineProperty(_LoadConfig, _ChartType2.default.QUANDL_TOKIO_STOCK, fnLoad4), _defineProperty(_LoadConfig, _ChartType2.default.QUANDL_CHINA_DCE_FUTURE, fnLoad4), _LoadConfig);

var addConfig = function addConfig(obj, fn) {
  for (var key in obj) {
    LoadConfig[obj[key]] = fn;
  }
};
addConfig(_DialogType.QuandlGoogle, fnLoad4);
addConfig(_DialogType.QuandlYahoo, fnLoad4);

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map