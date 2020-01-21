"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ChartLogicFn = _interopRequireDefault(require("../ChartLogicFn"));

var isChartExist = _ChartLogicFn["default"].isChartExist,
    removeConfig = _ChartLogicFn["default"].removeConfig,
    toTop = _ChartLogicFn["default"].toTop,
    removeAll = _ChartLogicFn["default"].removeAll,
    updateMovingValues = _ChartLogicFn["default"].updateMovingValues;
var CHART_TYPE = "AA_BB";

var _crChartsConfig = function _crChartsConfig(chartType) {
  var _ref;

  if (chartType === void 0) {
    chartType = CHART_TYPE;
  }

  return _ref = {}, _ref[chartType] = {
    chartType: chartType,
    configs: [{
      valueMoving: {},
      zhConfig: {
        key: 'k1',
        id: 'k1'
      }
    }, {
      valueMoving: {},
      zhConfig: {
        key: 'k2',
        id: 'k2'
      }
    }, {
      valueMoving: {},
      zhConfig: {
        key: 'k3',
        id: 'k3'
      }
    }]
  }, _ref;
};

var _getVm = function _getVm(chartsConfig, chartType, index) {
  return chartsConfig[chartType].configs[index].valueMoving;
};

describe('isChartExist', function () {
  test('should return true if config for chartType and key exists', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    expect(isChartExist(_chartsConfig, CHART_TYPE, "k1")).toBe(true);
    expect(isChartExist(_chartsConfig, CHART_TYPE, "k2")).toBe(true);
  });
  test('should return false if config for chartType and key does not exist', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    expect(isChartExist(_chartsConfig, CHART_TYPE, "k5")).toBe(false);
    expect(isChartExist(_chartsConfig, CHART_TYPE, "k6")).toBe(false);
  });
  test('should return false if configs for chartType does not exist', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    var _NOT_EXIST_CHART_TYPE = 'NOT_EXIST_' + CHART_TYPE;

    expect(isChartExist(_chartsConfig, _NOT_EXIST_CHART_TYPE, "k1")).toBe(false);
    expect(isChartExist(_chartsConfig, _NOT_EXIST_CHART_TYPE, "k2")).toBe(false);
    expect(isChartExist(_chartsConfig, _NOT_EXIST_CHART_TYPE, "k5")).toBe(false);
  });
});
describe('removeConfig', function () {
  test('should remove config from configs by id', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    var _idOrKey = 'k1';
    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(true);

    var _removeConfig = removeConfig(_chartsConfig, CHART_TYPE, _idOrKey),
        chartSlice = _removeConfig.chartSlice,
        isRemoved = _removeConfig.isRemoved;

    expect(isRemoved).toBe(true);
    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(false);
    expect(chartSlice).toBe(_chartsConfig[CHART_TYPE]);
  });
  test('should return object with isRemoved false for not existed id', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    var _idOrKey = 'k5';
    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(false);

    var _removeConfig2 = removeConfig(_chartsConfig, CHART_TYPE, _idOrKey),
        chartSlice = _removeConfig2.chartSlice,
        isRemoved = _removeConfig2.isRemoved;

    expect(isRemoved).toBe(false);
    expect(isChartExist(_chartsConfig, CHART_TYPE, _idOrKey)).toBe(false);
    expect(chartSlice).toBe(_chartsConfig[CHART_TYPE]);
  });
});
describe('toTop', function () {
  test('should set and return chart slice with config on 0 index by chartType and id', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    var _idOrKey = 'k3';
    expect(_chartsConfig[CHART_TYPE].configs[0].zhConfig.id).not.toBe(_idOrKey);
    var chartSlice = toTop(_chartsConfig, CHART_TYPE, _idOrKey);
    expect(_chartsConfig[CHART_TYPE].configs[0].zhConfig.id).toBe(_idOrKey);
    expect(chartSlice.configs[0].zhConfig.id).toBe(_idOrKey);
  });
});
describe('removeAll', function () {
  test('should set and return chartSlice with empty configs array', function () {
    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    expect(_chartsConfig[CHART_TYPE].configs.length).not.toBe(0);
    var chartSlice = removeAll(_chartsConfig, CHART_TYPE);
    expect(_chartsConfig[CHART_TYPE].configs.length).toBe(0);
    expect(chartSlice.configs.length).toBe(0);
  });
});
describe('updateMovingValues', function () {
  test('should update valueMoving for all configs', function () {
    var VM0 = {
      value: "1.01"
    };
    var VM1 = {
      value: "2.02"
    };
    var VM2 = {
      value: "3.03"
    };

    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    updateMovingValues(_chartsConfig, CHART_TYPE, [VM0, VM1, VM2]);
    expect(_getVm(_chartsConfig, CHART_TYPE, 0)).toBe(VM0);
    expect(_getVm(_chartsConfig, CHART_TYPE, 1)).toBe(VM1);
    expect(_getVm(_chartsConfig, CHART_TYPE, 2)).toBe(VM2);
  });
  test('should not update valueMoving for configs if array lenghts not match', function () {
    var VM0 = {
      value: "1.01"
    };
    var VM1 = {
      value: "2.02"
    };

    var _chartsConfig = _crChartsConfig(CHART_TYPE);

    var _prevVm0 = _getVm(_chartsConfig, CHART_TYPE, 0);

    var _prevVm1 = _getVm(_chartsConfig, CHART_TYPE, 1);

    updateMovingValues(_chartsConfig, CHART_TYPE, [VM0, VM1]);
    expect(_getVm(_chartsConfig, CHART_TYPE, 0)).not.toBe(VM0);
    expect(_getVm(_chartsConfig, CHART_TYPE, 0)).toBe(_prevVm0);
    expect(_getVm(_chartsConfig, CHART_TYPE, 1)).not.toBe(VM1);
    expect(_getVm(_chartsConfig, CHART_TYPE, 1)).toBe(_prevVm1);
  });
});
//# sourceMappingURL=ChartLogicFn.test.js.map