'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fCompareBy = require('./fCompareBy');

var _fCompareBy2 = _interopRequireDefault(_fCompareBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _get = {
  sliceConfigs: function sliceConfigs(slice, chartType) {
    var chartSlice = slice[chartType],
        _ref = chartSlice || {},
        configs = _ref.configs;

    return { chartSlice: chartSlice, configs: configs };
  }
};

var ChartLogic = {
  initChartSlice: function initChartSlice(slice, chartType, config) {
    var configs = config ? [config] : [];
    if (!slice[chartType]) {
      slice[chartType] = {
        chartType: chartType, configs: configs,
        isShow: true
      };
    }
  },
  isChartExist: function isChartExist(slice, chartType, key) {
    var _get$sliceConfigs = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs.chartSlice,
        configs = _get$sliceConfigs.configs;

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
    var _get$sliceConfigs2 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs2.chartSlice,
        configs = _get$sliceConfigs2.configs,
        _lenBefore = configs.length;

    chartSlice.configs = configs.filter(function (c) {
      return c.zhConfig.id !== id;
    });
    return {
      chartSlice: chartSlice,
      isRemoved: _lenBefore > chartSlice.configs.length
    };
  },
  sortBy: function sortBy(slice, chartType, by) {
    var _get$sliceConfigs3 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs3.chartSlice,
        configs = _get$sliceConfigs3.configs;

    configs.sort((0, _fCompareBy2.default)(by));
    return chartSlice;
  },
  reverseConfigs: function reverseConfigs(slice, chartType) {
    var _get$sliceConfigs4 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs4.chartSlice,
        configs = _get$sliceConfigs4.configs;

    configs.reverse();
    return chartSlice;
  }
};

exports.default = ChartLogic;
//# sourceMappingURL=ChartLogic.js.map