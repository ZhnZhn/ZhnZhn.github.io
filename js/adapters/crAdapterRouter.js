"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var getAdapter = function getAdapter(rAdapter, option) {
  var _rAdapter$_pn = rAdapter._pn,
      _pn = _rAdapter$_pn === void 0 ? 'dfSubId' : _rAdapter$_pn,
      routeId = option[_pn],
      adapter = routeId && rAdapter[routeId] || rAdapter.DF;

  return _isFn(adapter) ? adapter() : adapter;
};

var crAdapterRouter = function crAdapterRouter(rAdapter, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      isKey = _ref.isKey,
      crDfKey = _ref.crDfKey;

  var _getAdapter = getAdapter.bind(null, rAdapter);

  var _adapter = {
    crKey: isKey || crDfKey ? function (option) {
      var _crKey = _getAdapter(option).crKey || crDfKey;

      return _isFn(_crKey) ? _crKey(option) : void 0;
    } : void 0,
    toConfig: function toConfig(json, option) {
      return _getAdapter(option).toConfig(json, option);
    },
    isAdd: function isAdd(option) {
      return _isFn(_getAdapter(option).toSeries);
    },
    toSeries: function toSeries(json, option, chart) {
      return _getAdapter(option).toSeries(json, option, chart);
    }
  };
  return _adapter;
};

var _default = crAdapterRouter;
exports["default"] = _default;
//# sourceMappingURL=crAdapterRouter.js.map