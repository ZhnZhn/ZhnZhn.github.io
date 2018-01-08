'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crUTC = _fnAdapter2.default.crUTC,
    crZhConfig = _fnAdapter2.default.crZhConfig,
    crValueMoving = _fnAdapter2.default.crValueMoving,
    crInfo = _fnAdapter2.default.crInfo;


var _crData = function _crData(Results, option) {
  var dfFilterName = option.dfFilterName,
      two = option.two,
      d = [],
      isFilter = dfFilterName ? true : false;


  Results.Data.forEach(function (item) {
    var v = parseFloat(item.DataValue),
        y = !Number.isNaN(v) ? v : null;
    if (!(isFilter && item[dfFilterName] !== two)) {
      d.push({
        x: crUTC(item),
        y: y
      });
    }
  });

  return d;
};

var BeaAdapter = {
  toConfig: function toConfig(json, option) {
    var Results = json.BEAAPI.Results,
        data = _crData(Results, option),
        seria = (0, _ConfigBuilder2.default)().initSpline({ data: data }).toConfig(),
        title = option.title,
        dfTitle = option.dfTitle,
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(dfTitle, title).clearSeries().addSeries(seria).add({
      zhConfig: crZhConfig(option),
      valueMoving: crValueMoving(data),
      info: crInfo(Results)
    }).toConfig();


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