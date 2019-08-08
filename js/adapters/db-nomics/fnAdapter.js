'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _fnSelector = require('./fnSelector');

var _fnSelector2 = _interopRequireDefault(_fnSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crError = _AdapterFn2.default.crError,
    crItemLink = _AdapterFn2.default.crItemLink,
    ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;
var getPeriodAndValue = _fnSelector2.default.getPeriodAndValue,
    getTitle = _fnSelector2.default.getTitle,
    getSubtitle = _fnSelector2.default.getSubtitle,
    getInexedAt = _fnSelector2.default.getInexedAt;


var C = {
  CHART_URL: 'https://db.nomics.world',
  SUBT_MAX: 60
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

var _crItemLink = crItemLink.bind(null, 'DB Nomics Chart');
var _crUpdatedDate = function _crUpdatedDate(json) {
  var _date = getInexedAt(json).split('T')[0];
  return _date ? '<p>Updated by DBnomics on ' + _date + '</p>' : '';
};
var _crDescr = function _crDescr(json, option) {
  var _id = _getId(option);
  return '<p>SeriaId: ' + _id + '</p>\n   ' + _crUpdatedDate(json) + '\n   ' + _crItemLink(C.CHART_URL + '/' + _id);
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
    description: _crDescr(json, option)
  };
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
};

var fnAdapter = {
  crError: crError,
  crTitle: function crTitle(_ref3, json) {
    var title = _ref3.title,
        subtitle = _ref3.subtitle;

    var _ = getSubtitle(json),
        _subtitle = _.length > C.SUBT_MAX ? (title || '') + ': ' + (subtitle || '') : _;
    return {
      title: getTitle(json),
      subtitle: _subtitle
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

  crConfigOption: function crConfigOption(_ref4) {
    var json = _ref4.json,
        option = _ref4.option,
        data = _ref4.data;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(json, option)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map