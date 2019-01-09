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
    var configSlice = option.zhMapSlice,
        seriaColor = option.seriaColor;

    return _JsonStatFn2.default.trJsonToCategory(json, configSlice).then(function (_ref) {
      var categories = _ref.categories,
          data = _ref.data,
          min = _ref.min;

      var config = _FactoryChart2.default.createBarConfig({ seriaColor: seriaColor });
      _EuroStatFn2.default.addToCategoryConfig(config, {
        json: json, option: option, data: data, categories: categories, min: min
      });
      return config;
    });
  }
};

exports.default = toBar;
//# sourceMappingURL=toBar.js.map