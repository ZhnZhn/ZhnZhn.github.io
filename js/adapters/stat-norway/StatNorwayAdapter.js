'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RouterConfig = require('./RouterConfig');

var _RouterConfig2 = _interopRequireDefault(_RouterConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AREA = 'AREA';

var StatNorwayAdapter = {
  toConfig: function toConfig(json, option) {
    var seriaType = option.seriaType,
        crConfig = _RouterConfig2.default.getCrConfig(seriaType),
        config = crConfig(json, option);


    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === undefined ? AREA : _option$seriaType,
        crConfig = _RouterConfig2.default.getCrConfig(seriaType),
        config = crConfig(json, option);

    return config.series[0];
  }
};

exports.default = StatNorwayAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\StatNorwayAdapter.js.map