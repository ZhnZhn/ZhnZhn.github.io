'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    findMaxY = _AdapterFn2.default.findMaxY,
    findMinY = _AdapterFn2.default.findMinY,
    crZhFn = _AdapterFn2.default.crZhFn,
    valueMoving = _AdapterFn2.default.valueMoving;


var C = {
  CHART_URL: 'https://db.nomics.world'
};

var _crDescr = function _crDescr(_ref) {
  var dfProvider = _ref.dfProvider,
      dfCode = _ref.dfCode,
      seriaId = _ref.seriaId;

  var _id = seriaId.indexOf(dfProvider) === -1 ? dfProvider + '/' + dfCode + '/' + seriaId : seriaId;
  return '\n   <p>SeriaId: ' + _id + '</p>\n   <p><a href="' + C.CHART_URL + '/' + _id + '" style="padding-top: 4px;">DB Nomics Chart</a></p>\n  ';
};

var _crZhConfig = function _crZhConfig(json, option) {
  var dataSource = option.dataSource,
      seriaId = option.seriaId,
      id = seriaId;

  return {
    id: id, key: id,
    //itemCaption: title,
    isWithoutAdd: true,
    dataSource: dataSource
  };
};
var _crInfo = function _crInfo(json, option) {
  var name = json.series.name || '';
  return {
    name: name,
    description: _crDescr(option)
  };
};

var fnAdapter = {
  findMaxY: findMaxY,
  findMinY: findMinY,

  crTitle: function crTitle(option, json) {
    var title = json.series.name || '',
        subtitle = '';
    return {
      title: title,
      subtitle: subtitle
    };
  },
  crData: function crData(json) {
    var series = json.series,
        period = series.period,
        value = series.value,
        data = [];

    period.forEach(function (p, i) {
      data.push({
        x: ymdToUTC(p),
        y: value[i]
      });
    });
    return data;
  },
  crConfigOption: function crConfigOption(_ref2) {
    var json = _ref2.json,
        option = _ref2.option,
        data = _ref2.data;

    return (0, _extends3.default)({
      zhConfig: _crZhConfig(json, option),
      valueMoving: valueMoving(data),
      info: _crInfo(json, option)
    }, crZhFn());
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map