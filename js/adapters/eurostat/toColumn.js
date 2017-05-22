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
        _option$time = option.time,
        time = _option$time === undefined ? '' : _option$time,
        _option$subtitle = option.subtitle,
        subtitle = _option$subtitle === undefined ? '' : _option$subtitle;

    return _JsonStatFn2.default.trJsonToCategory(json, configSlice).then(function (_ref) {
      var categories = _ref.categories,
          data = _ref.data,
          min = _ref.min;

      var config = _FactoryChart2.default.createColumnConfig();
      _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
      _EuroStatFn2.default.setCategories({ config: config, categories: categories, min: min, time: time, subtitle: subtitle });
      _EuroStatFn2.default.colorEU({ config: config, categories: categories });
      return config;
    });
  },

  createSeria: function createSeria(json, option, chart) {
    var categories = chart.options.xAxis[0].categories;
    var configSlice = option.zhMapSlice,
        time = configSlice.time,
        data = _JsonStatFn2.default.trJsonToSeria(json, configSlice, categories);


    return {
      zhSeriaId: 'optionKey',
      zhValueText: 'Value',
      minY: _EuroStatFn2.default.findMinY(data),
      name: time,
      data: data
    };
  }
};

exports.default = toColumn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\toColumn.js.map