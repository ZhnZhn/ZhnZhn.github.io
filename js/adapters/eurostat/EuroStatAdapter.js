"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _toArea = _interopRequireDefault(require("./toArea"));

var _toAreaYearly = _interopRequireDefault(require("./toAreaYearly"));

var _toCategory = _interopRequireDefault(require("./toCategory"));

var _toMap = _interopRequireDefault(require("./toMap"));

const DF_TYPE = 'SPLINE';
const _rToConfig = {
  AREA: _toArea.default.createConfig,
  SPLINE: _toArea.default.createConfig,
  COLUMN: _toArea.default.createConfig,
  AREA_YEARLY: _toAreaYearly.default.createConfig,
  MAP: _toMap.default.createConfig,
  COLUMN_SET: _toCategory.default.createConfig,
  BAR_SET: _toCategory.default.createConfig,
  BAR_WITH_LABELS: _toCategory.default.createConfig,
  DOT_SET: _toCategory.default.createConfig
};
const _rToSeria = {
  AREA: _toArea.default.createSeria,
  SPLINE: _toArea.default.createSeria,
  COLUMN: _toArea.default.createSeria,
  COLUMN_SET: _toCategory.default.createSeria,
  BAR_SET: _toCategory.default.createSeria,
  BAR_WITH_LABELS: _toCategory.default.createSeria,
  DOT_SET: _toCategory.default.createSeria
};

const _checkSeriaType = function (router, option, dfType) {
  if (dfType === void 0) {
    dfType = DF_TYPE;
  }

  if (!option.seriaType || !router[option.seriaType]) {
    option.seriaType = dfType;
  }
};

const EuroStatAdapter = {
  toConfig(json, option) {
    _checkSeriaType(_rToConfig, option);

    const {
      seriaType,
      zhCompType
    } = option,
          fnToConfig = _rToConfig[seriaType],
          config = fnToConfig ? fnToConfig(json, option) : {};
    config.zhCompType = zhCompType;
    return {
      config
    };
  },

  toSeries(json, option, chart) {
    _checkSeriaType(_rToConfig, option);

    const {
      seriaType
    } = option,
          fnToSeria = _rToSeria[seriaType],
          seria = fnToSeria ? fnToSeria(json, option, chart) : void 0;
    return seria;
  }

};
var _default = EuroStatAdapter;
exports.default = _default;
//# sourceMappingURL=EuroStatAdapter.js.map