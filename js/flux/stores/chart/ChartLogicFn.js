"use strict";

exports.__esModule = true;
exports.updateMovingValues = exports.toTop = exports.removeConfig = exports.removeAll = exports.isChartExist = void 0;
var _getSubSliceOf = require("./getSubSliceOf");
const _getConfigId = c => c.zhConfig.id;
const _notConfById = id => c => _getConfigId(c) !== id;
const _confById = id => c => _getConfigId(c) === id;
const _getConfigKey = c => c.zhConfig.key;
const isChartExist = (slice, chartType, key) => {
  const configs = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType)[1];
  for (let config of configs) {
    if (_getConfigKey(config) === key) {
      return true;
    }
  }
  return false;
};
exports.isChartExist = isChartExist;
const removeConfig = (slice, chartType, id) => {
  const [chartSlice, configs] = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType);
  chartSlice.configs = configs.filter(_notConfById(id));
  return {
    chartSlice,
    isRemoved: configs.length > chartSlice.configs.length
  };
};
exports.removeConfig = removeConfig;
const toTop = (slice, chartType, id) => {
  const [chartSlice, configs] = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType),
    _conf = configs.find(_confById(id));
  if (_conf) {
    const arrWithout = configs.filter(_notConfById(id));
    chartSlice.configs = [_conf, ...arrWithout];
  }
  return chartSlice;
};
exports.toTop = toTop;
const removeAll = (slice, chartType) => {
  const _slice = slice[chartType] || {};
  _slice.configs = [];
  return _slice;
};
exports.removeAll = removeAll;
const _isRequireUpdateMovingValues = (configs, movingValues) => configs.length === movingValues.length;
const updateMovingValues = (slice, chartType, movingValues) => {
  const configs = (0, _getSubSliceOf.getSubSliceOf)(slice, chartType)[1];
  if (_isRequireUpdateMovingValues(configs, movingValues)) {
    const _hmConfigs = configs.reduce((hm, config) => {
      hm[_getConfigId(config)] = config;
      return hm;
    }, Object.create(null));
    movingValues.forEach(mv => {
      const _config = _hmConfigs[mv._id];
      if (_config) {
        _config.valueMoving = mv;
      }
    });
  }
};
exports.updateMovingValues = updateMovingValues;
//# sourceMappingURL=ChartLogicFn.js.map