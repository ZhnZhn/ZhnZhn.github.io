'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _DialogType = require('../../constants/DialogType');

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _fnCatchLoadError = function _fnCatchLoadError(error, chartId, onFailed) {
  var caption = void 0,
      descr = void 0;
  if (error instanceof TypeError) {
    if (error.message.indexOf('fetch') !== -1) {
      caption = _Msg2.default.Alert.NETWORK_ERROR.caption;
      descr = _Msg2.default.Alert.NETWORK_ERROR.descr;
    } else {
      caption = error.zhCaption ? error.zhCaption : 'Runtime Error';
      descr = error.message;
    }
  } else {
    caption = error.zhCaption ? error.zhCaption : 'Runtime Error';
    descr = error.message;
  }
  onFailed({ caption: caption, descr: descr, chartId: chartId });
};

var loadData = function loadData(chartType, browserType, option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();
  if (!parentId) {
    loadToChartComp(chartType, browserType, option, onCompleted, onFailed);
  } else {
    loadToChart(chartType, browserType, option, parentId, onAdded, onFailed);
  }
};

var _fnAddSeriesToChart = function _fnAddSeriesToChart(chart, series, label) {
  var options = chart.options;
  //12symbols
  var seriesText = label.length > 12 ? label.substring(0, 12) : label,
      seriesCount = options.zhSeries.count,
      row = Math.floor(seriesCount / 3),
      x = 110 + 100 * seriesCount - row * 300,
      y = 55 + 15 * row;

  chart.addSeries(series, true, true);
  chart.renderer.text(seriesText, x, y).css({ color: options.colors[series._colorIndex] }).add();

  options.zhSeries.count += 1;
};

var loadToChart = function loadToChart(chartType, browserType, option, parentId, onAdded, onFailed) {
  var chartId = option.value;
  var dataColumn = option.dataColumn;

  option.apiKey = _ChartStore2.default.getQuandlKey();
  fetch(_QuandlApi2.default.getRequestUrl(option)).then(function (response) {
    return Promise.all([Promise.resolve(response), response.json()]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var response = _ref2[0];
    var json = _ref2[1];

    if (_QuandlApi2.default.checkResponse(response, json)) {
      var series = _QuandlAdapter2.default.toSeries(json, dataColumn, chartId, parentId),
          chart = _ChartStore2.default.getActiveChart();
      _fnAddSeriesToChart(chart, series, chartId);

      onAdded();
    }
  }).catch(function (error) {
    _fnCatchLoadError(error, chartId, onFailed);
  });
};

var loadToChartComp = function loadToChartComp(chartType, browserType, option, onCompleted, onFailed) {
  var chartId = option.value;
  var dataColumn = option.dataColumn;

  if (!_ChartStore2.default.isChartExist(chartType, chartId)) {
    option.apiKey = _ChartStore2.default.getQuandlKey();
    fetch(_QuandlApi2.default.getRequestUrl(option)).then(function (response) {
      return Promise.all([Promise.resolve(response), response.json()]);
    }).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2);

      var response = _ref4[0];
      var json = _ref4[1];

      if (_QuandlApi2.default.checkResponse(response, json)) {
        var _QuandlAdapter$toConf = _QuandlAdapter2.default.toConfig(json, dataColumn, chartId);

        var config = _QuandlAdapter$toConf.config;

        config.zhConfig = {
          id: chartId,
          dataColumn: dataColumn,
          itemCaption: option.itemCaption
        };
        onCompleted(chartType, browserType, config);
      }
    }).catch(function (error) {
      _fnCatchLoadError(error, chartId, onFailed);
    });
  } else {
    var _Msg$Alert$ALREADY_EX = _Msg2.default.Alert.ALREADY_EXIST;
    var caption = _Msg$Alert$ALREADY_EX.caption;
    var descr = _Msg$Alert$ALREADY_EX.descr;

    onFailed({ caption: caption, descr: descr, chartId: chartId });
  }
};

var LoadConfig = _defineProperty({}, _ChartType2.default.WATCH_LIST, loadData);

var addConfig = function addConfig(obj, fn) {
  for (var key in obj) {
    LoadConfig[obj[key]] = fn;
  }
};
addConfig(_DialogType.Quandl, loadData);
addConfig(_DialogType.QuandlGoogle, loadData);
addConfig(_DialogType.QuandlYahoo, loadData);

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map