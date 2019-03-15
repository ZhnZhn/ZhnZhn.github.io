'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valueMoving = _AdapterFn2.default.valueMoving;


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
  if (str.length === 4) {
    return Date.UTC(str, 11, 31);
  }
};

var _crZhConfig = function _crZhConfig(json, option) {
  var dataSource = option.dataSource,
      key = option.key,
      id = json.series[0].series_id;

  return {
    id: id, key: key,
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


  crConfigOption: function crConfigOption(_ref) {
    var json = _ref.json,
        option = _ref.option,
        data = _ref.data;
    return {
      zhConfig: _crZhConfig(json, option),
      valueMoving: valueMoving(data),
      info: _crInfo(json)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map