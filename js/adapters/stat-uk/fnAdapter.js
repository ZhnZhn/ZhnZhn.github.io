"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getValue = _AdapterFn["default"].getValue,
    crError = _AdapterFn["default"].crError,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    compareByDate = _AdapterFn["default"].compareByDate,
    valueMoving = _AdapterFn["default"].valueMoving,
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
}; //Jan-20

var _mmmYyToMls = function _mmmYyToMls(str) {
  var _arr = str.split('-'),
      _m = MONTH_HM[_arr[0].trim()],
      _yStr = _arr[1].trim(),
      _yPrefix = _yStr < '30' ? '20' : '19';

  return ymdToUTC("" + _yPrefix + _yStr + "-" + _m);
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      title = _ref.title,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: title,
    dataSource: dataSource
  };
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
        observations = json.observations;
    var i = 0;

    for (; i < observations.length; i++) {
      var item = observations[i],
          dimensions = item.dimensions,
          observation = item.observation,
          _ref6 = (dimensions || {}).time || {},
          id = _ref6.id,
          _x = _mmmYyToMls(id),
          _y = parseFloat(observation);

      if (_isNumber(_x) && _isNumber(_y)) {
        _data.push([_x, _y]);
      }
    }

    return _data.sort(compareByDate);
  },
  crConfigOption: function crConfigOption(_ref7) {
    var json = _ref7.json,
        option = _ref7.option,
        data = _ref7.data;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(json, option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map