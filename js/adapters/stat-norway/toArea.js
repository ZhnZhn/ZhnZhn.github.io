'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnUtil = require('./fnUtil');

var _fnUtil2 = _interopRequireDefault(_fnUtil);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toUTC = _fnUtil2.default.toUTC;
var _crZhConfig = _fnAdapter2.default.crZhConfig;
var _crInfo = _fnAdapter2.default.crInfo;

var _crAreaMapSlice = function _crAreaMapSlice(items) {
  var mapSlice = {};
  items.forEach(function (item) {
    if (item.slice) {
      Object.assign(mapSlice, item.slice);
    }
  });
  return mapSlice;
};

var _toData = function _toData(values, times) {
  var data = [];
  times.forEach(function (time, index) {
    data.push({
      x: _toUTC(time),
      y: values[index].value
    });
  });
  return data;
};

var _crSplineSeria = function _crSplineSeria(data) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _option$metric = option.metric,
      id = _option$metric === undefined ? "id" : _option$metric;

  return Object.assign(_ChartConfig2.default.fSeries(), {
    type: 'spline',
    visible: true,
    data: data,
    marker: {
      symbol: 'circle'
    },
    //zhSeriaId: ticket + '_' + valueText ,
    zhSeriaId: id
    //zhValueText: valueText
  }, option);
};

var toArea = {
  crConfig: function crConfig(json, option) {
    var _option$title = option.title,
        title = _option$title === undefined ? '' : _option$title,
        subtitle = option.subtitle,
        items = option.items,
        mapSlice = _crAreaMapSlice(items),
        ds = (0, _jsonstat2.default)(json).Dataset(0),
        values = ds.Data(mapSlice),
        times = ds.Dimension("Tid").id,
        data = _toData(values, times),
        seria = _crSplineSeria(data, option),
        config = (0, _ConfigBuilder2.default)().initBaseArea().add('chart', { spacingTop: 25 }).addCaption(title, subtitle).clearSeries().addSeries(seria).add('info', _crInfo(ds)).add('zhConfig', _crZhConfig(option)).toConfig();

    return config;
  }
};

exports.default = toArea;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\toArea.js.map