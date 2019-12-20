"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _LoadConfig = _interopRequireDefault(require("./LoadConfig"));

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _crQuandlKey = function _crQuandlKey(option) {
  var loadId = option.loadId,
      isLoadMeta = option.isLoadMeta,
      value = option.value,
      dataColumn = option.dataColumn,
      seriaType = option.seriaType,
      viewKey = option.viewKey;
  return loadId === _Type.LoadType.QCT && !isLoadMeta ? seriaType === _Type.ChartType.AREA ? value + "_" + _Type.ChartType.AREA + "_" + dataColumn : value + "_" + seriaType : viewKey || value;
};

var _crEurostatKey = function _crEurostatKey(option) {
  var _option$geo = option.geo,
      geo = _option$geo === void 0 ? '' : _option$geo,
      _option$group = option.group,
      group = _option$group === void 0 ? '' : _option$group,
      _option$metric = option.metric,
      metric = _option$metric === void 0 ? '' : _option$metric,
      _option$seriaType = option.seriaType,
      seriaType = _option$seriaType === void 0 ? 'AREA' : _option$seriaType,
      _option$time = option.time,
      time = _option$time === void 0 ? '' : _option$time,
      _metric = metric.replace('?', '_');

  return geo + "_" + group + "_" + _metric + "_" + seriaType + "_" + time;
};

var _crKey = function _crKey(option) {
  var loadId = option.loadId,
      value = option.value,
      loadConfig = _LoadConfig["default"][loadId] || {},
      crKey = loadConfig.crKey;
  return _isFn(crKey) ? crKey(option) : value || 'key';
};

var LogicUtils = {
  createKeyForConfig: function createKeyForConfig(option) {
    var loadId = option.loadId;

    switch (loadId) {
      case _Type.LoadType.Q:
      case _Type.LoadType.QCT:
        return _crQuandlKey(option);

      case _Type.LoadType.EU_STAT:
      case _Type.LoadType.EIA:
        return _crEurostatKey(option);

      case _Type.LoadType.WL:
        return option.id;

      default:
        return _crKey(option);
    }
  }
};
var _default = LogicUtils;
exports["default"] = _default;
//# sourceMappingURL=LogicUtils.js.map