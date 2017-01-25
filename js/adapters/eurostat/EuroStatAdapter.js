'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArea = require('./toArea');

var _toArea2 = _interopRequireDefault(_toArea);

var _toColumn = require('./toColumn');

var _toColumn2 = _interopRequireDefault(_toColumn);

var _toBar = require('./toBar');

var _toBar2 = _interopRequireDefault(_toBar);

var _toMap = require('./toMap');

var _toMap2 = _interopRequireDefault(_toMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rToConfig = {
  AREA: _toArea2.default.createConfig,
  MAP: _toMap2.default.createConfig,
  COLUMN: _toColumn2.default.createConfig,
  BAR: _toBar2.default.createConfig
};

var _rToSeria = {
  AREA: _toArea2.default.createSeria,
  COLUMN: _toColumn2.default.createSeria,
  BAR: _toColumn2.default.createSeria
};

var EuroStatAdapter = {
  toConfig: function toConfig(json, option) {
    var _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === undefined ? 'AREA' : _option$seriaType,
        fnToConfig = _rToConfig[seriaType],
        config = typeof fnToConfig !== 'undefined' ? fnToConfig(json, option) : {};


    return config;
  },
  toSeries: function toSeries(json, option, chart) {
    var _option$seriaType2 = option.seriaType,
        seriaType = _option$seriaType2 === undefined ? 'AREA' : _option$seriaType2,
        fnToSeria = _rToSeria[seriaType],
        seria = typeof fnToSeria !== 'undefined' ? fnToSeria(json, option, chart) : undefined;


    return seria;
  }
};

exports.default = EuroStatAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\EuroStatAdapter.js.map