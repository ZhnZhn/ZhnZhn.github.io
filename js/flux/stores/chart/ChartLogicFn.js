"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.updateMovingValues = exports.toTop = exports.removeConfig = exports.removeAll = exports.isChartExist = void 0;
var _getSlice = _interopRequireDefault(require("./getSlice"));
const _notConfById = id => c => c.zhConfig.id !== id;
const _confById = id => c => c.zhConfig.id === id;
const isChartExist = (slice, chartType, key) => {
  const {
    chartSlice,
    configs
  } = (0, _getSlice.default)(slice, chartType);
  if (!chartSlice) {
    return false;
  }
  const _max = configs.length;
  let i = 0;
  for (; i < _max; i++) {
    if (configs[i].zhConfig.key === key) {
      return true;
    }
  }
  return false;
};
exports.isChartExist = isChartExist;
const removeConfig = (slice, chartType, id) => {
  const {
    chartSlice,
    configs
  } = (0, _getSlice.default)(slice, chartType);
  chartSlice.configs = configs.filter(_notConfById(id));
  return {
    chartSlice,
    isRemoved: configs.length > chartSlice.configs.length
  };
};
exports.removeConfig = removeConfig;
const toTop = (slice, chartType, id) => {
  const {
      chartSlice,
      configs
    } = (0, _getSlice.default)(slice, chartType),
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
const updateMovingValues = (slice, chartType, movingValues) => {
  const {
      configs
    } = (0, _getSlice.default)(slice, chartType),
    _maxConfigs = configs.length;
  if (_maxConfigs === movingValues.length) {
    movingValues.forEach(mv => {
      const _config = configs.find(_confById(mv._id));
      if (_config) {
        _config.valueMoving = mv;
      }
    });
  }
};
exports.updateMovingValues = updateMovingValues;
//# sourceMappingURL=ChartLogicFn.js.map