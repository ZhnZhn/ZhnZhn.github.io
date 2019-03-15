'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _fnSelector = require('./fnSelector');

var _fnSelector2 = _interopRequireDefault(_fnSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;
var getPeriodAndValue = _fnSelector2.default.getPeriodAndValue,
    getTitle = _fnSelector2.default.getTitle,
    getSubtitle = _fnSelector2.default.getSubtitle;


var C = {
  CHART_URL: 'https://db.nomics.world'
};

var _isId = function _isId(id) {
  return id && id.indexOf('/') !== -1;
};
var _getId = function _getId(_ref) {
  var dfProvider = _ref.dfProvider,
      dfCode = _ref.dfCode,
      seriaId = _ref.seriaId;
  return _isId(seriaId) ? seriaId : dfProvider + '/' + dfCode + '/' + seriaId;
};

var _crDescr = function _crDescr(option) {
  var _id = _getId(option);
  return '\n   <p>SeriaId: ' + _id + '</p>\n   <p><a href="' + C.CHART_URL + '/' + _id + '" style="padding-top: 4px;">DB Nomics Chart</a></p>\n  ';
};

var _crZhConfig = function _crZhConfig(_ref2) {
  var dataSource = _ref2.dataSource,
      _itemKey = _ref2._itemKey,
      seriaId = _ref2.seriaId;
  return {
    id: _itemKey || seriaId,
    key: _itemKey || seriaId,
    //itemCaption: title,
    isWithoutAdd: true,
    dataSource: dataSource
  };
};
var _crInfo = function _crInfo(json, option) {
  return {
    name: getSubtitle(json),
    description: _crDescr(option)
  };
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
};

var fnAdapter = {

  crTitle: function crTitle(option, json) {
    return {
      title: getTitle(json),
      subtitle: getSubtitle(json)
    };
  },

  crData: function crData(json) {
    var data = [],
        _getPeriodAndValue = getPeriodAndValue(json),
        period = _getPeriodAndValue.period,
        value = _getPeriodAndValue.value;

    period.forEach(function (p, i) {
      if (_isNumber(value[i])) {
        data.push([ymdToUTC(p), value[i]]);
      }
    });
    return data;
  },

  crConfigOption: function crConfigOption(_ref3) {
    var json = _ref3.json,
        option = _ref3.option,
        data = _ref3.data;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(json, option)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map