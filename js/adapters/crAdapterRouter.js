"use strict";

exports.__esModule = true;
exports.default = void 0;
const _isFn = fn => typeof fn === 'function';
const _getDfRoute = (option, rAdapter) => {
  const {
      _pn = 'dfSubId'
    } = rAdapter,
    routeId = option[_pn];
  return routeId && rAdapter[routeId] || rAdapter.DF;
};
const _fGetAdapter = function (getRoute, rAdapter) {
  if (getRoute === void 0) {
    getRoute = _getDfRoute;
  }
  return option => {
    const routeAdapter = getRoute(option, rAdapter);
    return _isFn(routeAdapter) ? routeAdapter() : routeAdapter;
  };
};
const crAdapterRouter = function (rAdapter, _temp) {
  let {
    getRoute,
    isKey,
    crDfKey
  } = _temp === void 0 ? {} : _temp;
  const _getAdapter = _fGetAdapter(getRoute, rAdapter);
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
var _default = crAdapterRouter;
exports.default = _default;
//# sourceMappingURL=crAdapterRouter.js.map