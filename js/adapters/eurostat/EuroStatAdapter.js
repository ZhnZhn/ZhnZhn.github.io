'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArea = require('./toArea');

var _toArea2 = _interopRequireDefault(_toArea);

var _toAreaYearly = require('./toAreaYearly');

var _toAreaYearly2 = _interopRequireDefault(_toAreaYearly);

var _toColumn = require('./toColumn');

var _toColumn2 = _interopRequireDefault(_toColumn);

var _toBar = require('./toBar');

var _toBar2 = _interopRequireDefault(_toBar);

var _toMap = require('./toMap');

var _toMap2 = _interopRequireDefault(_toMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_TYPE = 'SPLINE';
var _rToConfig = {
  AREA: _toArea2.default.createConfig,
  SPLINE: _toArea2.default.createConfig,
  AREA_YEARLY: _toAreaYearly2.default.createConfig,
  MAP: _toMap2.default.createConfig,
  COLUMN: _toColumn2.default.createConfig,
  BAR: _toBar2.default.createConfig
};

var _rToSeria = {
  AREA: _toArea2.default.createSeria,
  SPLINE: _toArea2.default.createSeria,
  COLUMN: _toColumn2.default.createSeria,
  BAR: _toColumn2.default.createSeria
};

var _checkSeriaType = function _checkSeriaType(router, option) {
  var dfType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DF_TYPE;

  if (!option.seriaType || !router[option.seriaType]) {
    option.seriaType = dfType;
  }
};

var EuroStatAdapter = {
  toConfig: function toConfig(json, option) {
    _checkSeriaType(_rToConfig, option);
    var seriaType = option.seriaType,
        zhCompType = option.zhCompType,
        fnToConfig = _rToConfig[seriaType],
        config = fnToConfig ? fnToConfig(json, option) : {};


    config.zhCompType = zhCompType;
    return { config: config };
  },
  toSeries: function toSeries(json, option, chart) {
    _checkSeriaType(_rToConfig, option);
    var seriaType = option.seriaType,
        fnToSeria = _rToSeria[seriaType],
        seria = fnToSeria ? fnToSeria(json, option, chart) : undefined;

    return seria;
  }
};

exports.default = EuroStatAdapter;
//# sourceMappingURL=EuroStatAdapter.js.map