"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getValue = _AdapterFn["default"].getValue,
    crError = _AdapterFn["default"].crError,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    compareByDate = _AdapterFn["default"].compareByDate,
    joinBy = _AdapterFn["default"].joinBy,
    crItemLink = _AdapterFn["default"].crItemLink;

var _crItemLink = crItemLink.bind(null, 'ONS Dataset Metadata');

var MONTH_HM = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
};
var QUARTER_HM = {
  q1: "03",
  q2: "06",
  q3: "09",
  q4: "12"
};

var _getTimeObj = function _getTimeObj(dimensions) {
  return (dimensions || {}).Time || {};
}; //Jan-20


var _mmmYyToMls = function _mmmYyToMls(str) {
  var _arr = str.split('-'),
      _m = MONTH_HM[_arr[0].trim()],
      _yStr = _arr[1].trim(),
      _yPrefix = _yStr < '30' ? '20' : '19';

  return ymdToUTC("" + _yPrefix + _yStr + "-" + _m);
}; //2010-q1


var _yyyyQqToMls = function _yyyyQqToMls(str) {
  var _ref = str && str.split('-') || [],
      _yyyy = _ref[0],
      _ref$ = _ref[1],
      _q = _ref$ === void 0 ? '' : _ref$,
      _mm = QUARTER_HM[_q.trim().toLowerCase()];

  return _yyyy && _mm ? ymdToUTC(_yyyy + "-" + _mm) : NaN;
};

var _fCrToMls = function _fCrToMls(observations) {
  var _item = observations[0] || {},
      _getTimeObj2 = _getTimeObj(_item.dimensions),
      _getTimeObj2$href = _getTimeObj2.href,
      href = _getTimeObj2$href === void 0 ? '' : _getTimeObj2$href;

  return href.indexOf('yyyy-qq') !== -1 ? _yyyyQqToMls : _mmmYyToMls;
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _crName = function _crName(_ref2, _ref3) {
  var unit_of_measure = _ref2.unit_of_measure;
  var title = _ref3.title,
      subtitle = _ref3.subtitle;
  return joinBy(': ', subtitle, title, unit_of_measure);
};

var _crDescr = function _crDescr(_ref4) {
  var links = _ref4.links;

  var _ref5 = (links || {}).dataset_metadata || {},
      href = _ref5.href;

  return href ? _crItemLink(href) : '';
};

var _crInfo = function _crInfo(json, option) {
  return {
    name: _crName(json, option),
    description: _crDescr(json)
  };
};

var fnAdapter = {
  getValue: getValue,
  crError: crError,
  crData: function crData(json) {
    var _data = [],
        observations = json.observations,
        _toMsl = _fCrToMls(observations);

    var i = 0;

    for (; i < observations.length; i++) {
      var item = observations[i],
          dimensions = item.dimensions,
          observation = item.observation,
          _getTimeObj3 = _getTimeObj(dimensions),
          id = _getTimeObj3.id,
          _x = _toMsl(id),
          _y = parseFloat(observation);

      if (_isNumber(_x) && _isNumber(_y)) {
        _data.push([_x, _y]);
      }
    }

    return _data.sort(compareByDate);
  },
  addConfOption: function addConfOption(option, json) {
    return {
      info: _crInfo(json, option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map