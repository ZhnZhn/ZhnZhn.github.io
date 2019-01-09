'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FactoryChart = require('./FactoryChart');

var _FactoryChart2 = _interopRequireDefault(_FactoryChart);

var _JsonStatFn = require('./JsonStatFn');

var _JsonStatFn2 = _interopRequireDefault(_JsonStatFn);

var _EuroStatFn = require('./EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toColumn = {
  createConfig: function createConfig(json, option) {
    var configSlice = option.zhMapSlice,
        seriaColor = option.seriaColor;

    return _JsonStatFn2.default.trJsonToCategory(json, configSlice).then(function (_ref) {
      var categories = _ref.categories,
          data = _ref.data,
          min = _ref.min;

      var config = _FactoryChart2.default.createColumnConfig({ seriaColor: seriaColor });
      _EuroStatFn2.default.addToCategoryConfig(config, {
        json: json, option: option, data: data, categories: categories, min: min
      });
      return config;
    });
  },

  createSeria: function createSeria(json, option, chart) {
    var categories = chart.options.xAxis[0].categories;

    var _option$zhMapSlice = option.zhMapSlice,
        configSlice = _option$zhMapSlice === undefined ? {} : _option$zhMapSlice,
        time = option.time,
        seriaColor = option.seriaColor,
        _name = configSlice.time || time,
        data = _JsonStatFn2.default.trJsonToSeria(json, configSlice, categories);

    return {
      zhSeriaId: 'optionKey',
      zhValueText: 'Value',
      minY: _EuroStatFn2.default.findMinY(data),
      name: _name,
      color: seriaColor,
      data: data
    };
  }
};

exports.default = toColumn;
//# sourceMappingURL=toColumn.js.map