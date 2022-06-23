"use strict";

var _ChartConfigFn = require("../ChartConfigFn");

describe('isLineType', () => {
  const fn = _ChartConfigFn.isLineType;
  test('should return boolean isLineType from chart config seria by index 0', () => {
    expect(fn({})).toBe(false);
    expect(fn({
      series: []
    })).toBe(false);
    expect(fn({
      series: [{
        type: 'spline'
      }]
    })).toBe(true);
    expect(fn({
      series: [{
        type: 'line'
      }]
    })).toBe(true);
    expect(fn({
      series: [{
        type: 'area'
      }]
    })).toBe(true);
    expect(fn({
      series: [{
        type: 'all-other-types'
      }]
    })).toBe(false);
    expect(fn({
      series: [{
        type: 'bar'
      }]
    })).toBe(false);
    expect(fn({
      series: [{
        type: 'column'
      }]
    })).toBe(false);
  });
});

const _testSeriaConfigTooltipShape = seriaConfig => {
  expect(typeof seriaConfig.tooltip).toBe('object');
  expect(typeof seriaConfig.tooltip.headerFormat).toBe('string');
  expect(typeof seriaConfig.tooltip.pointFormatter).toBe('function');
};

describe('crSeriaConfig', () => {
  const fn = _ChartConfigFn.crSeriaConfig,
        _expectedSeriaConfigInitialShape = {
    type: 'spline',
    lineWidth: 1,
    color: void 0
  };
  test('should return initial seria by empty options', () => {
    const _seriaConfig = fn({});

    expect(_seriaConfig).toMatchObject(_expectedSeriaConfigInitialShape);

    _testSeriaConfigTooltipShape(_seriaConfig);
  });
  test('should use seria property options', () => {
    const seriaType = 'line',
          seriaColor = '#7cb5ec',
          seriaWidth = 2;

    const _seriaConfig = fn({
      seriaType,
      seriaColor,
      seriaWidth
    });

    expect(_seriaConfig).toMatchObject({
      type: seriaType,
      lineWidth: seriaWidth,
      color: seriaColor
    });

    _testSeriaConfigTooltipShape(_seriaConfig);
  });
  test('should use rest props options', () => {
    const _restProps = {
      restProp: 'restProp',
      tooltip: 'str'
    },
          _seriaConfig = fn({ ..._restProps
    });

    expect(_seriaConfig).toMatchObject({ ..._expectedSeriaConfigInitialShape,
      restProp: 'restProp',
      tooltip: 'str'
    });
    expect(typeof _seriaConfig.tooltip).toBe('string');
  });
});

const _testSeriaConfigPointEventsMouseOver = seriaConfig => {
  expect(typeof seriaConfig.point.events.mouseOver).toBe('function');
};

describe('setSeriaDataTo', () => {
  const fn = _ChartConfigFn.setSeriaDataTo,
        data = [],
        index = 0,
        name = 'Seria1',
        _expectedSeriaConfigInitialShape = {
    type: 'area',
    lineWidth: 1
  };
  test('should set initial seria config', () => {
    const _config = {
      series: []
    };
    fn(_config, data, index, name);
    const _seriaConfig = _config.series[index];
    expect(_seriaConfig).toMatchObject({ ..._expectedSeriaConfigInitialShape,
      name
    });

    _testSeriaConfigPointEventsMouseOver(_seriaConfig);
  });
  test('should use param options', () => {
    const _config = {
      series: []
    },
          options = {
      type: 'line',
      lineWidth: 2,
      name: 'Seria2'
    };
    fn(_config, data, index, name, options);
    const _seriaConfig = _config.series[index];
    expect(_seriaConfig).toMatchObject({ ...options
    });

    _testSeriaConfigPointEventsMouseOver(_seriaConfig);
  });
});
//# sourceMappingURL=ChartConfigFn.test.js.map