'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadQuandlCommodityTrade = undefined;

var _lodash = require('lodash.sortby');

var _lodash2 = _interopRequireDefault(_lodash);

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _loadQuandl = require('./loadQuandl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnFetchToChartComp = function _fnFetchToChartComp(_ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;

  var arr = json.dataset.column_names,
      max = arr.length;
  var optionTrades = [];
  for (var i = 1; i < max; i++) {
    optionTrades.push({ caption: arr[i], value: i });
  }
  optionTrades = (0, _lodash2.default)(optionTrades, 'caption');
  option.onLoad(optionTrades);
};

var _fnFailedLoadMeta = function _fnFailedLoadMeta(option, onFailed, optionFailed) {
  option.onFailed();
  onFailed(optionFailed);
};

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  var isLoadMeta = option.isLoadMeta,
      _onFetch = isLoadMeta ? _fnFetchToChartComp : _loadQuandl.fnFetchToChartComp,
      _onFailed = isLoadMeta ? _fnFailedLoadMeta.bind(null, option, onFailed) : onFailed;

  (0, _fn.fnFetch)({
    uri: _QuandlApi2.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _QuandlApi2.default.checkResponse,
    onFetch: _onFetch,
    onCompleted: onCompleted,
    onCatch: _fnCatch.fnCatch,
    onFailed: _onFailed
  });
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  var isLoadMeta = option.isLoadMeta,
      _onFetch = isLoadMeta ? _fnFetchToChartComp : _loadQuandl.fnFetchToChart,
      _onFailed = isLoadMeta ? _fnFailedLoadMeta.bind(null, option, onFailed) : onFailed;

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

var loadQuandlCommodityTrade = function loadQuandlCommodityTrade(option, onCompleted, onAdded, onFailed) {
  var parentId = _ChartStore2.default.isLoadToChart();

  option.apiKey = _ChartStore2.default.getQuandlKey();

  if (!parentId) {
    _loadToChartComp(option, onCompleted, onFailed);
  } else {
    option.parentId = parentId;
    _loadToChart(option, onAdded, onFailed);
  }
};

exports.loadQuandlCommodityTrade = loadQuandlCommodityTrade;
//# sourceMappingURL=loadQuandlCommodityTrade.js.map