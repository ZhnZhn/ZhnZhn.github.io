"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.loadNdlCommodityTrade = void 0;
var _LoadType = require("../../constants/LoadType");
var _fnFetch = require("../../utils/fnFetch");
var _onCatch = _interopRequireDefault(require("./onCatch"));
var _settingStore = require("../stores/settingStore");
var _chartCheckBoxLogic = require("../stores/chartCheckBoxLogic");
var _NdlApi = _interopRequireDefault(require("../../adapters/ndl/NdlApi"));
var _LoadImpl = _interopRequireDefault(require("./LoadImpl"));
const _compareByCaption = (a, b) => {
  if (a.caption < b.caption) return -1;else if (a.caption > b.caption) return 1;else return 0;
};
const _fnFetchToChartComp = function (_ref) {
  let {
    json,
    option,
    onCompleted
  } = _ref;
  const arr = json.dataset.column_names,
    max = arr.length;
  let optionTrades = [],
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
const _fnFailedLoadMeta = function (option, onFailed, optionFailed) {
  option.onFailed();
  onFailed(optionFailed);
};
const _loadToChartComp = function (option, onCompleted, onFailed) {
  const {
      isLoadMeta
    } = option,
    _onFetch = isLoadMeta ? _fnFetchToChartComp : _LoadImpl.default[_LoadType.LT_Q].fnFetchToChartComp,
    _onFailed = isLoadMeta ? _fnFailedLoadMeta.bind(null, option, onFailed) : onFailed;
  (0, _fnFetch.fetchJson)({
    uri: _NdlApi.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _NdlApi.default.checkResponse,
    onFetch: _onFetch,
    onCompleted: onCompleted,
    onCatch: _onCatch.default,
    onFailed: _onFailed
  });
};
const _loadToChart = function (option, onAdded, onFailed) {
  const {
      isLoadMeta
    } = option,
    _onFetch = isLoadMeta ? _fnFetchToChartComp : _LoadImpl.default[_LoadType.LT_Q].fnFetchToChart,
    _onFailed = isLoadMeta ? _fnFailedLoadMeta.bind(null, option, onFailed) : onFailed;
  (0, _fnFetch.fetchJson)({
    uri: _NdlApi.default.getRequestUrl(option),
    option: option,
    onCheckResponse: _NdlApi.default.checkResponse,
    onFetch: _onFetch,
    onCompleted: onAdded,
    onCatch: _onCatch.default,
    onFailed: _onFailed
  });
};
const loadNdlCommodityTrade = exports.loadNdlCommodityTrade = {
  loadItem(option, onCompleted, onAdded, onFailed) {
    const parentId = (0, _chartCheckBoxLogic.isLoadToChart)();
    option.apiKey = (0, _settingStore.getKey)(_LoadType.LT_Q);
    if (!parentId) {
      _loadToChartComp(option, onCompleted, onFailed);
    } else {
      option.parentId = parentId;
      _loadToChart(option, onAdded, onFailed);
    }
  }
};
//# sourceMappingURL=loadNdlCommodityTrade.js.map