'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crData = _fnAdapter2.default.crData,
    crConfigOption = _fnAdapter2.default.crConfigOption;


var BeaAdapter = {
  toConfig: function toConfig(json, option) {
    var Results = json.BEAAPI.Results,
        data = crData(Results, option),
        seria = (0, _ConfigBuilder2.default)().initSpline({ data: data }).toConfig(),
        title = option.title,
        dfTitle = option.dfTitle,
        config = (0, _ConfigBuilder2.default)().initBaseArea2(dfTitle, title).addSeries(seria).add((0, _extends3.default)({}, crConfigOption({ option: option, data: data, Results: Results }))).toConfig();


    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    var _BeaAdapter$toConfig = BeaAdapter.toConfig(json, option),
        config = _BeaAdapter$toConfig.config;

    return config.series[0];
  }
};

exports.default = BeaAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\bea\BeaAdapter.js.map