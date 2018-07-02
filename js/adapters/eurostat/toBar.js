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

var toBar = {
  createConfig: function createConfig(json, option) {
    var configSlice = option.zhMapSlice;

    return _JsonStatFn2.default.trJsonToCategory(json, configSlice).then(function (_ref) {
      var categories = _ref.categories,
          data = _ref.data,
          min = _ref.min;

      var config = _FactoryChart2.default.createBarConfig();
      _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
      _EuroStatFn2.default.setCategories({ config: config, categories: categories, min: min, option: option });
      _EuroStatFn2.default.colorEU({ config: config, categories: categories });
      return config;
    });
  }
};

exports.default = toBar;
//# sourceMappingURL=toBar.js.map