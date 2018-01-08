'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArea = require('./toArea');

var _toArea2 = _interopRequireDefault(_toArea);

var _toYearly = require('./toYearly');

var _toYearly2 = _interopRequireDefault(_toYearly);

var _toColumn = require('./toColumn');

var _toColumn2 = _interopRequireDefault(_toColumn);

var _toTreeMap = require('./toTreeMap');

var _toTreeMap2 = _interopRequireDefault(_toTreeMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _r = {
  DF: _toArea2.default.crConfig,
  AREA: _toArea2.default.crConfig,
  AREA_YEARLY: _toYearly2.default.crConfig,
  COLUMN: _toColumn2.default.fCrConfig(),
  BAR: _toColumn2.default.fCrConfig(),
  COLUMN_CLUSTER: _toColumn2.default.fCrConfig({
    isCluster: true, seriaType: 'COLUMN'
  }),
  BAR_CLUSTER: _toColumn2.default.fCrConfig({
    isCluster: true, seriaType: 'BAR'
  }),
  COLUMN_BY_2: _toColumn2.default.fCrConfig({ seriaType: 'COLUMN' }, { by: '2' }),
  BAR_BY_2: _toColumn2.default.fCrConfig({ seriaType: 'BAR' }, { by: '2' }),
  TREE_MAP: _toTreeMap2.default.fCrConfig(),
  TREE_MAP_CLUSTER: _toTreeMap2.default.fCrConfig({ isCluster: true }),
  TREE_MAP_2: _toTreeMap2.default.fCrConfig({}, { depth: "d2" }),
  TREE_MAP_2_CLUSTER: _toTreeMap2.default.fCrConfig({ isCluster: true }, { depth: "d2" })
};

var RouterConfig = {
  getCrConfig: function getCrConfig(seriaType) {
    return _r[seriaType] || _r.DF;
  }
};

exports.default = RouterConfig;
//# sourceMappingURL=RouterConfig.js.map