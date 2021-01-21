"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.loadQuandlCommodityTrade = void 0;

var _Type = require("../../constants/Type");

var _fnFetch = require("../../utils/fnFetch");

var _onCatch = _interopRequireDefault(require("./onCatch"));

var _ChartStore = _interopRequireDefault(require("../stores/ChartStore"));

var _QuandlApi = _interopRequireDefault(require("../../adapters/quandl/QuandlApi"));

var _LoadImpl = _interopRequireDefault(require("./LoadImpl"));

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
    optionTrades.push({
      caption: arr[i],
      value: i
    });
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
      _onFetch = isLoadMeta ? _fnFetchToChartComp //: LoadImpl.Quandl.loadItem
  : _LoadImpl["default"].Quandl.fnFetchToChartComp,
      _onFailed = isLoadMeta ? _fnFailedLoadMeta.bind(null, option, onFailed) : onFailed;

  (0, _fnFetch.fetchJson)({
    uri: _QuandlApi["default"].getRequestUrl(option),
    option: option,
    onCheckResponse: _QuandlApi["default"].checkResponse,
    onFetch: _onFetch,
    onCompleted: onCompleted,
    onCatch: _onCatch["default"],
    onFailed: _onFailed
  });
};

var _loadToChart = function _loadToChart(option, onAdded, onFailed) {
  var isLoadMeta = option.isLoadMeta,
      _onFetch = isLoadMeta ? _fnFetchToChartComp : _LoadImpl["default"].Quandl.fnFetchToChart,
      _onFailed = isLoadMeta ? _fnFailedLoadMeta.bind(null, option, onFailed) : onFailed;

  (0, _fnFetch.fetchJson)({
    uri: _QuandlApi["default"].getRequestUrl(option),
    option: option,
    onCheckResponse: _QuandlApi["default"].checkResponse,
    onFetch: _onFetch,
    onCompleted: onAdded,
    onCatch: _onCatch["default"],
    onFailed: _onFailed
  });
};

var loadQuandlCommodityTrade = {
  loadItem: function loadItem(option, onCompleted, onAdded, onFailed) {
    var parentId = _ChartStore["default"].isLoadToChart();

    option.apiKey = _ChartStore["default"].getKey(_Type.LoadType.Q);

    if (!parentId) {
      _loadToChartComp(option, onCompleted, onFailed);
    } else {
      option.parentId = parentId;

      _loadToChart(option, onAdded, onFailed);
    }
  }
};
exports.loadQuandlCommodityTrade = loadQuandlCommodityTrade;
//# sourceMappingURL=loadQuandlCommodityTrade.js.map