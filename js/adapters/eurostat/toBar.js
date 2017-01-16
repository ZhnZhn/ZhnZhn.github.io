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
        _option$time = option.time,
        time = _option$time === undefined ? '' : _option$time,
        _option$subtitle = option.subtitle,
        subtitle = _option$subtitle === undefined ? '' : _option$subtitle,
        _JsonStatFn$trJsonToC = _JsonStatFn2.default.trJsonToCategory(json, configSlice),
        categories = _JsonStatFn$trJsonToC.categories,
        data = _JsonStatFn$trJsonToC.data,
        min = _JsonStatFn$trJsonToC.min,
        config = _FactoryChart2.default.createBarConfig();

    _EuroStatFn2.default.setDataAndInfo({ config: config, data: data, json: json, option: option });
    _EuroStatFn2.default.setCategories({ config: config, categories: categories, min: min, time: time, subtitle: subtitle });

    return config;
  }
};

exports.default = toBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\toBar.js.map