'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _toYearly = require('../toYearly');

var _toYearly2 = _interopRequireDefault(_toYearly);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

var _fnUtil = require('./fnUtil');

var _fnUtil2 = _interopRequireDefault(_fnUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toYMD = _fnUtil2.default.toYMD;
var crDsValuesTimes = _fnAdapter2.default.crDsValuesTimes,
    crInfo = _fnAdapter2.default.crInfo,
    crZhConfig = _fnAdapter2.default.crZhConfig;


var _toData = function _toData(values, times) {
  var _values = Array.isArray(values) ? values : [values];
  var data = times.map(function (time, i) {
    return [toYMD(time), _values[i].value];
  });

  return data.reverse();
};

var toYearly = {
  crConfig: function crConfig(json, option) {
    var _option$title = option.title,
        title = _option$title === undefined ? '' : _option$title,
        subtitle = option.subtitle,
        _crDsValuesTimes = crDsValuesTimes(json, option),
        ds = _crDsValuesTimes.ds,
        values = _crDsValuesTimes.values,
        times = _crDsValuesTimes.times,
        data = _toData(values, times),
        config = (0, _ConfigBuilder2.default)().init(_toYearly2.default.toConfig(data, option)).add('chart', { spacingTop: 25 }).addCaption(title, subtitle).add('info', crInfo(ds, option)).add('zhConfig', crZhConfig(option)).add('zhConfig', { isWithLegend: true }).toConfig();

    return config;
  }
};

exports.default = toYearly;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\toYearly.js.map