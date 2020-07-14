"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var crAdapter = function crAdapter(getAdapter, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      isKey = _ref.isKey,
      crDfKey = _ref.crDfKey;

  return {
    crKey: isKey || crDfKey ? function (option) {
      var _crKey = getAdapter(option).crKey || crDfKey;

      return _isFn(_crKey) ? _crKey(option) : void 0;
    } : void 0,
    toConfig: function toConfig(json, option) {
      return getAdapter(option).toConfig(json, option);
    },
    isAdd: function isAdd(option) {
      return _isFn(getAdapter(option).toSeries);
    },
    toSeries: function toSeries(json, option, chart) {
      return getAdapter(option).toSeries(json, option, chart);
    }
  };
};

var _default = crAdapter;
exports["default"] = _default;
//# sourceMappingURL=crAdapter.js.map