"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getSlice5 = _interopRequireDefault(require("./getSlice"));

var _notConfById = function _notConfById(id) {
  return function (c) {
    return c.zhConfig.id !== id;
  };
};

var _confById = function _confById(id) {
  return function (c) {
    return c.zhConfig.id === id;
  };
};

var fns = {
  isChartExist: function isChartExist(slice, chartType, key) {
    var _getSlice = (0, _getSlice5["default"])(slice, chartType),
        chartSlice = _getSlice.chartSlice,
        configs = _getSlice.configs;

    if (!chartSlice) {
      return false;
    }

    var _max = configs.length;
    var i = 0;

    for (; i < _max; i++) {
      if (configs[i].zhConfig.key === key) {
        return true;
      }
    }

    return false;
  },
  removeConfig: function removeConfig(slice, chartType, id) {
    var _getSlice2 = (0, _getSlice5["default"])(slice, chartType),
        chartSlice = _getSlice2.chartSlice,
        configs = _getSlice2.configs;

    chartSlice.configs = configs.filter(_notConfById(id));
    return {
      chartSlice: chartSlice,
      isRemoved: configs.length > chartSlice.configs.length
    };
  },
  toTop: function toTop(slice, chartType, id) {
    var _getSlice3 = (0, _getSlice5["default"])(slice, chartType),
        chartSlice = _getSlice3.chartSlice,
        configs = _getSlice3.configs,
        _conf = configs.find(_confById(id));

    if (_conf) {
      var arrWithout = configs.filter(_notConfById(id));
      chartSlice.configs = [_conf].concat(arrWithout);
    }

    return chartSlice;
  },
  removeAll: function removeAll(slice, chartType) {
    var _slice = slice[chartType] || {};

    _slice.configs = [];
    return _slice;
  },
  updateMovingValues: function updateMovingValues(slice, chartType, movingValues) {
    var _getSlice4 = (0, _getSlice5["default"])(slice, chartType),
        configs = _getSlice4.configs,
        _maxConfigs = configs.length;

    if (_maxConfigs === movingValues.length) {
      var i = 0;

      for (; i < _maxConfigs; i++) {
        configs[i].valueMoving = movingValues[i];
      }
    }
  }
};
var _default = fns;
exports["default"] = _default;
//# sourceMappingURL=ChartLogicFn.js.map