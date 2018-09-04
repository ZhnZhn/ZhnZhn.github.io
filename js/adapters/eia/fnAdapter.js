'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crZhFn = _AdapterFn2.default.crZhFn,
    valueMoving = _AdapterFn2.default.valueMoving,
    findMaxY = _AdapterFn2.default.findMaxY,
    findMinY = _AdapterFn2.default.findMinY;


var C = {
  CHART_URL: "https://www.eia.gov/opendata/embed.php?type=chart&series_id="
};

var _toUTC = function _toUTC(str) {
  if (str.length === 6) {
    var _year = str.substr(0, 4),
        _month = parseInt(str.substr(4), 10) - 1,
        _day = _month === 1 ? 28 : 30;
    return Date.UTC(_year, _month, _day);
  }
};

var _crZhConfig = function _crZhConfig(json, option) {
  var dataSource = option.dataSource,
      id = json.series[0].series_id;

  return {
    id: id, key: id,
    //itemCaption: title,
    isWithoutAdd: true,
    dataSource: dataSource
  };
};

var _crDescr = function _crDescr(s) {
  var _s$description = s.description,
      description = _s$description === undefined ? '' : _s$description,
      _s$units = s.units,
      units = _s$units === undefined ? '' : _s$units,
      _s$source = s.source,
      source = _s$source === undefined ? '' : _s$source,
      _s$series_id = s.series_id,
      series_id = _s$series_id === undefined ? '' : _s$series_id,
      updated = s.updated;

  return '<p>' + description + '</p>\n  <p>Units: ' + units + '</p>\n  <p>Source: ' + source + '</p>\n  <p>Updated: ' + (updated ? updated.replace('T', ' ') : '') + '</p>\n  <p>Id: ' + series_id + '</p>\n  <p><a href="' + C.CHART_URL + series_id + '" style="padding-top: 4px;">EIA Chart</a></p>';
};

var _crInfo = function _crInfo(json) {
  var _s = json.series[0];
  return {
    name: _s.name,
    description: _crDescr(_s)
  };
};

var _getCaption = function _getCaption(obj) {
  return obj && obj.caption ? obj.caption : '';
};

var fnAdapter = {
  /*
  [ ["201806", 1000], ... ]
  */
  crTitle: function crTitle(option) {
    var _option$items = option.items,
        items = _option$items === undefined ? [] : _option$items,
        dfTitle = option.dfTitle,
        _s1 = _getCaption(items[0]),
        _s2 = _getCaption(items[1]),
        _s3 = _getCaption(items[2]),
        _subtitle = '' + _s2 + (_s3 ? ':' : '') + ' ' + _s3;

    return {
      title: _s1 + ': ' + dfTitle,
      subtitle: _subtitle
    };
  },
  crData: function crData(json) {
    return json.series[0].data.map(function (arr) {
      return {
        x: _toUTC(arr[0]),
        y: arr[1]
      };
    }).reverse();
  },

  findMaxY: findMaxY,
  findMinY: findMinY,

  crConfigOption: function crConfigOption(_ref) {
    var json = _ref.json,
        option = _ref.option,
        data = _ref.data;
    return (0, _extends3.default)({
      zhConfig: _crZhConfig(json, option),
      valueMoving: valueMoving(data),
      info: _crInfo(json)
    }, crZhFn());
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map