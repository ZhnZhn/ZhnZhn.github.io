"use strict";

var _legendFn = require("../legendFn");

var _Color = require("../../constants/Color");

describe('legendItem', () => {
  const fn = _legendFn.legendItem;
  it('should create legend item obj', () => {
    expect(fn(0, 'blue', 'name', true)).toEqual({
      index: 0,
      color: 'blue',
      name: 'name',
      isVisible: true
    });
  });
  it('should use default value for isVisible as false', () => {
    expect(fn(0, 'blue', 'name')).toEqual({
      index: 0,
      color: 'blue',
      name: 'name',
      isVisible: false
    });
  });
});
describe('stockSeriesLegend', () => {
  const fn = _legendFn.stockSeriesLegend;
  it('should create stock series legends', () => {
    expect(fn()).toEqual([{
      index: 0,
      color: _Color.COLOR_S_STOCK_CLOSE,
      name: 'Close',
      isVisible: true
    }, {
      index: 1,
      color: _Color.COLOR_S_HIGH,
      name: 'High',
      isVisible: false
    }, {
      index: 2,
      color: _Color.COLOR_S_LOW,
      name: 'Low',
      isVisible: false
    }, {
      index: 3,
      color: _Color.COLOR_S_OPEN,
      name: 'Open',
      isVisible: false
    }]);
  });
});
//# sourceMappingURL=legendFn.test.js.map