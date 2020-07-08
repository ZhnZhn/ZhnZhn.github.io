"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _legendFn = _interopRequireDefault(require("../legendFn"));

var _Color = _interopRequireDefault(require("../../constants/Color"));

var legendItem = _legendFn["default"].legendItem,
    stockSeriesLegend = _legendFn["default"].stockSeriesLegend;
describe('legendItem', function () {
  var fn = legendItem;
  it('should create legend item obj', function () {
    expect(fn(0, 'blue', 'name', true)).toEqual({
      index: 0,
      color: 'blue',
      name: 'name',
      isVisible: true
    });
  });
  it('should use default value for isVisible as false', function () {
    expect(fn(0, 'blue', 'name')).toEqual({
      index: 0,
      color: 'blue',
      name: 'name',
      isVisible: false
    });
  });
});
describe('stockSeriesLegend', function () {
  var fn = stockSeriesLegend;
  it('should create stock series legends', function () {
    expect(fn()).toEqual([{
      index: 0,
      color: _Color["default"].S_STOCK_CLOSE,
      name: 'Close',
      isVisible: true
    }, {
      index: 1,
      color: _Color["default"].S_HIGH,
      name: 'High',
      isVisible: false
    }, {
      index: 2,
      color: _Color["default"].S_LOW,
      name: 'Low',
      isVisible: false
    }, {
      index: 3,
      color: _Color["default"].S_OPEN,
      name: 'Open',
      isVisible: false
    }]);
  });
});
//# sourceMappingURL=legendFn.test.js.map