'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Factory = require('../logic/Factory');

var _Factory2 = _interopRequireDefault(_Factory);

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

var _crChartContainer = function _crChartContainer(chartType, option) {
  var browserType = option.browserType,
      conf = option.conf;

  return _Factory2.default.createChartContainer(chartType, browserType, conf);
};

var ChartLogic = {
  _initChartSlice: function _initChartSlice(slice, chartType, config) {
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
  loadConfig: function loadConfig(slice, config, option) {
    var chartType = option.chartType,
        _get$sliceConfigs2 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs2.chartSlice,
        configs = _get$sliceConfigs2.configs;

    if (chartSlice) {
      configs.unshift(config);
      chartSlice.isShow = true;
      return { chartSlice: chartSlice };
    } else {
      ChartLogic._initChartSlice(slice, chartType, config);
      return {
        Comp: _crChartContainer(chartType, option)
      };
    }
  },
  showChart: function showChart(slice, chartType, browserType, conf) {
    var _get$sliceConfigs3 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs3.chartSlice;

    if (chartSlice) {
      chartSlice.isShow = true;
      return { chartSlice: chartSlice };
    } else {
      ChartLogic._initChartSlice(slice, chartType);
      return {
        Comp: _crChartContainer(chartType, { browserType: browserType, conf: conf })
      };
    }
  },
  removeConfig: function removeConfig(slice, chartType, id) {
    var _get$sliceConfigs4 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs4.chartSlice,
        configs = _get$sliceConfigs4.configs,
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
    var _get$sliceConfigs5 = _get.sliceConfigs(slice, chartType),
        chartSlice = _get$sliceConfigs5.chartSlice,
        configs = _get$sliceConfigs5.configs;

    if (by) {
      configs.sort((0, _fCompareBy2.default)(by));
    } else {
      configs.reverse();
    }
    return chartSlice;
  }
};

exports.default = ChartLogic;
//# sourceMappingURL=ChartLogic.js.map