'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnComtradeAdapter = {
  crKey: _fnAdapter2.default.crChartId,

  toConfig: function toConfig(json, option) {
    var config = _fnAdapter2.default.toConfig(json, option);

    return {
      config: config
      //isDrawDeltaExtrems: false,
      //isNotZoomToMinMax: false
    };
  },
  toSeries: function toSeries(json, option) {
    var seria = _ChartConfig2.default.fSeries();
    Object.assign(seria, {
      zhSeriaId: 'Empty_Seria',
      zhValueText: 'Empty Seria'
    });
    return seria;
  }
};

exports.default = UnComtradeAdapter;
//# sourceMappingURL=UnComtradeAdapter.js.map