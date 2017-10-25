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

var _crTimeIndexAndValue = function _crTimeIndexAndValue(json) {
  var _json$dimension = json.dimension,
      dimension = _json$dimension === undefined ? {} : _json$dimension,
      _json$value = json.value,
      value = _json$value === undefined ? [] : _json$value,
      _dimension$time = dimension.time,
      time = _dimension$time === undefined ? {} : _dimension$time,
      _time$category = time.category,
      category = _time$category === undefined ? {} : _time$category,
      _category$index = category.index,
      timeIndex = _category$index === undefined ? 0 : _category$index;

  return { timeIndex: timeIndex, value: value };
};

var toAreaYearly = {
  createConfig: function createConfig(json, option) {
    var _crTimeIndexAndValue2 = _crTimeIndexAndValue(json),
        timeIndex = _crTimeIndexAndValue2.timeIndex,
        value = _crTimeIndexAndValue2.value,
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\toAreaYearly.js.map