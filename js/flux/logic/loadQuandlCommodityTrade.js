'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadQuandlCommodityTrade = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('../../adapters/QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

var _loadQuandl = require('./loadQuandl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  var chartId = option.value;
  var chartType = option.chartType;

  if (!_ChartStore2.default.isChartExist(chartType, chartId)) {
    var _onFetch = option.isLoadMeta ? _fnFetchToChartComp : _loadQuandl.fnFetchToChartComp,
        _onFailed = option.isLoadMeta ? _fnFailed.bind(null, option, onFailed) : onFailed;
    (0, _fn.fnFetch)({
      uri: _QuandlApi2.default.getRequestUrl(option),
      option: option,
      onCheckResponse: _QuandlApi2.default.checkResponse,
      onFetch: _onFetch,
      onCompleted: onCompleted,
      onCatch: _fnCatch.fnCatch,
      onFailed: _onFailed
    });
  } else {
    var _Msg$Alert$ALREADY_EX = _Msg2.default.Alert.ALREADY_EXIST;
    var caption = _Msg$Alert$ALREADY_EX.caption;
    var descr = _Msg$Alert$ALREADY_EX.descr;

    onFailed({ caption: caption, descr: descr, chartId: chartId });
  }
};

var _fnFetchToChartComp = function _fnFetchToChartComp(_ref) {
  var json = _ref.json;
  var option = _ref.option;
  var onCompleted = _ref.onCompleted;

  var arr = json.dataset.column_names,
      max = arr.length;
  var optionTrades = [];
  for (var i = 1; i < max; i++) {
    optionTrades.push({ caption: arr[i], value: i });
  }
  optionTrades = _lodash2.default.sortBy(optionTrades, 'caption');
  option.onLoad(optionTrades);
};

var _fnFailed = function _fnFailed(option, onFailed, optionFailed) {
  option.onFailed();
  onFailed(optionFailed);
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  var _onFetch = option.isLoadMeta ? _fnFetchToChartComp : _loadQuandl.fnFetchToChart,
      _onFailed = option.isLoadMeta ? _fnFailed.bind(null, option, onFailed) : onFailed;
  (0, _fn.fnFetch)({
    uri: _QuandlApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _QuandlApi2.default.checkResponse,
    onFetch: _onFetch,
    onCompleted: onAdded,
    onCatch: _fnCatch.fnCatch,
    onFailed: _onFailed
  });
};

var loadQuandlCommodityTrade = function loadQuandlCommodityTrade(chartType, browserType, option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();

  option.apiKey = _ChartStore2.default.getQuandlKey();

  if (!parentId) {
    option.chartType = chartType;
    option.browserType = browserType;
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
};

exports.loadQuandlCommodityTrade = loadQuandlCommodityTrade;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadQuandlCommodityTrade.js.map