'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArea = require('./toArea');

var _toArea2 = _interopRequireDefault(_toArea);

var _toColumn = require('./toColumn');

var _toColumn2 = _interopRequireDefault(_toColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _r = {
  DF: _toArea2.default.crConfig,
  AREA: _toArea2.default.crConfig,
  COLUMN: _toColumn2.default.crConfig,
  BAR: _toColumn2.default.crConfig,
  COLUMN_CLUSTER: _toColumn2.default.fCrConfig({
    isCluster: true, seriaType: 'COLUMN'
  }),
  BAR_CLUSTER: _toColumn2.default.fCrConfig({
    isCluster: true, seriaType: 'BAR'
  })
};

var RouterConfig = {
  getCrConfig: function getCrConfig(seriaType) {
    return _r[seriaType] || _r.DF;
  }
};

exports.default = RouterConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\RouterConfig.js.map