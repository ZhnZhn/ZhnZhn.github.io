"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _FactoryChart = _interopRequireDefault(require("./FactoryChart"));

var _JsonStatFn = _interopRequireDefault(require("./JsonStatFn"));

var _EuroStatFn = _interopRequireDefault(require("./EuroStatFn"));

var _crScatterProps = function _crScatterProps(seriaColor) {
  return {
    type: 'scatter',
    marker: {
      fillColor: seriaColor,
      radius: 5,
      symbol: 'circle'
    }
  };
};

var toCategory = {
  createConfig: function createConfig(json, option) {
    var configSlice = option.zhMapSlice;
    return _JsonStatFn["default"].trJsonToCategory(json, configSlice).then(function (_ref) {
      var categories = _ref.categories,
          data = _ref.data,
          min = _ref.min;

      var config = _FactoryChart["default"].createConfig(option);

      _EuroStatFn["default"].addToCategoryConfig(config, {
        json: json,
        option: option,
        data: data,
        categories: categories,
        min: min
      });

      return config;
    });
  },
  createSeria: function createSeria(json, option, chart) {
    var categories = chart.options.xAxis[0].categories;

    var _option$zhMapSlice = option.zhMapSlice,
        configSlice = _option$zhMapSlice === void 0 ? {} : _option$zhMapSlice,
        time = option.time,
        seriaColor = option.seriaColor,
        seriaType = option.seriaType,
        _name = configSlice.time || time,
        data = _JsonStatFn["default"].trJsonToSeria(json, configSlice, categories),
        _seriaProps = seriaType === 'DOT_SET' ? _crScatterProps(seriaColor) : void 0;

    return (0, _extends2["default"])({
      zhSeriaId: 'optionKey',
      zhValueText: 'Value',
      minY: _EuroStatFn["default"].findMinY(data),
      name: _name,
      color: seriaColor,
      data: data,
      tooltip: _EuroStatFn["default"].crCategoryTooltip()
    }, _seriaProps);
  }
};
var _default = toCategory;
exports["default"] = _default;
//# sourceMappingURL=toCategory.js.map