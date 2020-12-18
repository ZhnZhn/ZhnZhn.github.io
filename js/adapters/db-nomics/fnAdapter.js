"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _fnSelector = _interopRequireDefault(require("./fnSelector"));

var crError = _AdapterFn["default"].crError,
    crItemLink = _AdapterFn["default"].crItemLink,
    crItemConf = _AdapterFn["default"].crItemConf,
    joinBy = _AdapterFn["default"].joinBy,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    getValue = _AdapterFn["default"].getValue;
var getPeriodAndValue = _fnSelector["default"].getPeriodAndValue,
    getTitle = _fnSelector["default"].getTitle,
    getSubtitle = _fnSelector["default"].getSubtitle,
    getIndexedAt = _fnSelector["default"].getIndexedAt;
var C = {
  CHART_URL: 'https://db.nomics.world',
  SUBT_MAX: 60
};

var _isId = function _isId(id) {
  return id && id.indexOf('/') !== -1;
};

var _crId = function _crId(_ref) {
  var dfProvider = _ref.dfProvider,
      dfCode = _ref.dfCode,
      seriaId = _ref.seriaId;
  return joinBy('/', dfProvider, dfCode, seriaId);
};

var _getId = function _getId(option) {
  return _isId(option.seriaId) ? option.seriaId : _crId(option);
};

var _crItemLink = crItemLink.bind(null, 'DB Nomics Chart');

var _crUpdatedDate = function _crUpdatedDate(json) {
  var _date = getIndexedAt(json).split('T')[0];
  return _date ? "<p>Updated by DB Nomics on " + _date + "</p>" : '';
};

var _crDescr = function _crDescr(json, option) {
  var _id = _getId(option);

  return "<p>SeriaId: " + _id + "</p>\n   " + _crUpdatedDate(json) + "\n   " + _crItemLink(C.CHART_URL + '/' + _id);
};

var _crZhConfig = function _crZhConfig(option) {
  var dataSource = option.dataSource,
      _itemKey = option._itemKey,
      dfProvider = option.dfProvider,
      dfCode = option.dfCode,
      seriaId = option.seriaId,
      title = option.title,
      _id = _itemKey || seriaId;

  return {
    id: _id,
    key: _id,
    itemCaption: title,
    dataSource: dataSource,
    itemConf: (0, _extends2["default"])({
      _itemKey: _id
    }, crItemConf(option), {
      dataSource: dataSource,
      dfProvider: dfProvider,
      dfCode: dfCode,
      seriaId: seriaId
    })
  };
};

var _crInfo = function _crInfo(json, option) {
  return {
    name: getSubtitle(json),
    description: _crDescr(json, option)
  };
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _isQuarter = function _isQuarter(str) {
  return ("" + str).indexOf("Q") !== -1;
};

var _isAnnualQuarter = function _isAnnualQuarter(period) {
  return !_isQuarter(period[0]) && _isQuarter(period[1]);
};

var _crPoint = function _crPoint(date, y) {
  return [ymdToUTC(date), y];
};

var _crAqPoint = function _crAqPoint(date, y) {
  return _isQuarter(date) ? _crPoint(date, y) : [];
};

var fnAdapter = {
  crError: crError,
  getValue: getValue,
  crTitle: function crTitle(_ref2, json) {
    var title = _ref2.title,
        subtitle = _ref2.subtitle;

    var _ = getSubtitle(json),
        _subtitle = _.length > C.SUBT_MAX ? joinBy(': ', title, subtitle) : _;

    return {
      title: getTitle(json),
      subtitle: _subtitle
    };
  },
  crData: function crData(json, option) {
    var fromDate = option.fromDate,
        data = [],
        _xFrom = fromDate ? ymdToUTC(fromDate) : 0,
        _getPeriodAndValue = getPeriodAndValue(json),
        period = _getPeriodAndValue.period,
        value = _getPeriodAndValue.value,
        crPoint = _isAnnualQuarter(period) ? _crAqPoint : _crPoint,
        _len = period.length;

    var _arrPoint;

    for (var i = 0; i < _len; i++) {
      _arrPoint = crPoint(period[i], value[i]);

      if (_arrPoint[0] > _xFrom && _isNumber(_arrPoint[1])) {
        data.push(_arrPoint);
      }
    }

    return data;
  },
  crConfOption: function crConfOption(option, json) {
    return {
      zhConfig: _crZhConfig(option),
      info: _crInfo(json, option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map