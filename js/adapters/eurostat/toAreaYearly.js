'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _EuroStatFn = require('./EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

var _ToYearly = require('../ToYearly');

var _ToYearly2 = _interopRequireDefault(_ToYearly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
const _crTimeIndexAndValue = json => {
  const { dimension={}, value=[] } = json
      , { time={} } = dimension
      , { category={} } = time
      , { index:timeIndex=0 } = category;
  return { timeIndex, value };
}
*/

var toAreaYearly = {
  createConfig: function createConfig(json, option) {
    var _fn$crTimeIndexAndVal = _EuroStatFn2.default.crTimeIndexAndValue(json),
        timeIndex = _fn$crTimeIndexAndVal.timeIndex,
        value = _fn$crTimeIndexAndVal.value,
        data = _EuroStatFn2.default.toPointArr(timeIndex, value),
        title = option.title,
        subtitle = option.subtitle,
        dataSource = option.dataSource,
        config = _ToYearly2.default.toConfig(data.reverse(), {
      title: title, subtitle: subtitle,
      itemCaption: title + ': ' + subtitle,
      value: title + '_' + subtitle,
      dataSource: dataSource
    });

    _EuroStatFn2.default.setInfo({ config: config, json: json, option: option });
    return config;
  },

  createSeria: function createSeria(json, option) {
    var seria = _ChartConfig2.default.fSeries();
    Object.assign(seria, {
      zhSeriaId: 'Empty_Seria',
      zhValueText: 'Empty Seria'
    });
    return seria;
  }

};

exports.default = toAreaYearly;
//# sourceMappingURL=toAreaYearly.js.map