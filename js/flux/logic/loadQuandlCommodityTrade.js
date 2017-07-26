'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadQuandlCommodityTrade = undefined;

var _fn = require('../../utils/fn');

var _fnCatch = require('./fnCatch');

var _ChartStore = require('../stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _QuandlApi = require('../../api/QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _LoadImpl = require('./LoadImpl');

var _LoadImpl2 = _interopRequireDefault(_LoadImpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _compareByCaption = function _compareByCaption(a, b) {
  if (a.caption < b.caption) return -1;else if (a.caption > b.caption) return 1;else return 0;
};

var _fnFetchToChartComp = function _fnFetchToChartComp(_ref) {
  var json = _ref.json,
      option = _ref.option,
      onCompleted = _ref.onCompleted;

  var arr = json.dataset.column_names,
      max = arr.length;
  var optionTrades = [],
      i = 1;
  for (; i < max; i++) {
    optionTrades.push({ caption: arr[i], value: i });
  }
  optionTrades.sort(_compareByCaption);
  option.onLoad(optionTrades);
};

var _fnFailedLoadMeta = function _fnFailedLoadMeta(option, onFailed, optionFailed) {
  option.onFailed();
  onFailed(optionFailed);
};

var _loadToChartComp = function _loadToChartComp(option, onCompleted, onFailed) {
  var isLoadMeta = option.isLoadMeta,
      _onFetch = isLoadMeta ? _fnFetchToChartComp : _LoadImpl2.default.Quandl.fnFetchToChartComp,
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
      _onFetch = isLoadMeta ? _fnFetchToChartComp : _LoadImpl2.default.Quandl.fnFetchToChart,
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

var loadQuandlCommodityTrade = {
  loadItem: function loadItem(option, onCompleted, onAdded, onFailed) {
    var parentId = _ChartStore2.default.isLoadToChart();
    option.apiKey = _ChartStore2.default.getQuandlKey();

    if (!parentId) {
      _loadToChartComp(option, onCompleted, onFailed);
    } else {
      option.parentId = parentId;
      _loadToChart(option, onAdded, onFailed);
    }
  }
};

exports.loadQuandlCommodityTrade = loadQuandlCommodityTrade;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\loadQuandlCommodityTrade.js.map