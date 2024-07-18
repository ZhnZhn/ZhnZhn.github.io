"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fGetRouteTreeMap = exports.fGetRouteCategory = exports.fGetRouteBarTreeMap = exports.crAdapterRouterDfOb = exports.crAdapterRouter = void 0;
var _CategoryFn = require("./CategoryFn");
var _toOrderBookDf = _interopRequireDefault(require("./toOrderBookDf"));
const _isFn = fn => typeof fn === 'function';
const _getCategoryAdapter = (toCategoryAdapter, toLineAdapter, option) => (0, _CategoryFn.isCategory)(option.seriaType) ? toCategoryAdapter : toLineAdapter;
const fGetRouteCategory = (toCategoryAdapter, toLineAdapter) => option => _getCategoryAdapter(toCategoryAdapter, toLineAdapter, option);
exports.fGetRouteCategory = fGetRouteCategory;
const fGetRouteTreeMap = (toTreeMapAdapter, toCategoryAdapter, toLineAdapter) => option => (0, _CategoryFn.isTreeMap)(option.seriaType) ? _isFn(toTreeMapAdapter) ? toTreeMapAdapter(option) : toTreeMapAdapter : _getCategoryAdapter(toCategoryAdapter, toLineAdapter, option);
exports.fGetRouteTreeMap = fGetRouteTreeMap;
const fGetRouteBarTreeMap = (toBarTreeMapAdapter, toTreeMapAdapter, toCategoryAdapter, toLineAdapter) => {
  const _toRouteTreeMap = fGetRouteTreeMap(toTreeMapAdapter, toCategoryAdapter, toLineAdapter);
  return option => (0, _CategoryFn.isBarTreeMap)(option.seriaType) ? toBarTreeMapAdapter : _toRouteTreeMap(option);
};
exports.fGetRouteBarTreeMap = fGetRouteBarTreeMap;
const _fGetRouteDf = rAdapter => option => {
  const {
      _pn = 'dfSubId'
    } = rAdapter,
    routeId = option[_pn];
  return routeId && rAdapter[routeId] || rAdapter.DF;
};
const _fGetAdapter = getRoute => option => {
  const routeAdapter = getRoute(option);
  return _isFn(routeAdapter) ? routeAdapter() : routeAdapter;
};
const crAdapterRouter = _ref => {
  let {
    rAdapter,
    getRoute,
    isKey,
    crDfKey
  } = _ref;
  const _getRoute = getRoute || _fGetRouteDf(rAdapter),
    _getAdapter = _fGetAdapter(_getRoute);
  const _adapter = {
    crKey: isKey || crDfKey ? option => {
      const _crKey = _getAdapter(option).crKey || crDfKey;
      return _isFn(_crKey) ? _crKey(option) : void 0;
    } : void 0,
    toConfig: (json, option) => _getAdapter(option).toConfig(json, option),
    isAdd: option => _isFn(_getAdapter(option).toSeries),
    toSeries: (json, option, chart) => _getAdapter(option).toSeries(json, option, chart)
  };
  return _adapter;
};
exports.crAdapterRouter = crAdapterRouter;
const crAdapterRouterDfOb = (toKline, toOrderBook) => crAdapterRouter({
  rAdapter: {
    DF: toKline,
    OB: toOrderBook || _toOrderBookDf.default
  }
});
exports.crAdapterRouterDfOb = crAdapterRouterDfOb;
//# sourceMappingURL=crAdapterRouter.js.map