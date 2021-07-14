"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError,
    getValue = _AdapterFn["default"].getValue,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    roundBy = _AdapterFn["default"].roundBy;

var _crZhConfig = function _crZhConfig(_ref) {
  var itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource,
      _itemKey = _ref._itemKey,
      value = _ref.value,
      linkFn = _ref.linkFn;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    linkFn: linkFn,
    item: value,
    dataSource: dataSource
  };
};

var _crInfo = function _crInfo(_ref2) {
  var itemCaption = _ref2.itemCaption;
  return {
    name: itemCaption
  };
};

var _isNumber = function _isNumber(v) {
  return typeof v === 'number';
};

var _isHLOC = function _isHLOC(p) {
  return _isNumber(p.open) && _isNumber(p.high) && _isNumber(p.low) && _isNumber(p.close);
};

var _addPointTo = function _addPointTo(arr, d, value) {
  if (_isNumber(value)) {
    //arr.push({ x: d, y: value })
    arr.push([d, value]);
  }
};

var _addColumnPointTo = function _addColumnPointTo(arr, d, p, volume) {
  if (_isNumber(volume)) {
    arr.push(crVolumePoint({
      date: d,
      open: p.open,
      close: p.close,
      volume: volume,
      option: {
        _high: p.high,
        _low: p.low
      }
    }));
  }
};

var _addHLPointTo = function _addHLPointTo(arr, d, p) {
  arr.push({
    x: d,
    high: roundBy(p.high - p.close, 2),
    low: roundBy(p.low - p.close, 2),
    open: p.open,
    dayHigh: p.high,
    dayLow: p.low,
    close: p.close
  });
};

var fnAdapter = {
  crError: crError,
  getValue: getValue,
  crData: function crData(json) {
    var data = [],
        dVolume = [],
        dColumn = [],
        dToVolume = [],
        dHL = [];
    json.Data.forEach(function (p) {
      if (_isNumber(p.time)) {
        var _date = p.time * 1000;

        _addPointTo(data, _date, p.close);

        _addPointTo(dVolume, _date, p.volumefrom);

        _addPointTo(dToVolume, _date, p.volumeto);

        if (_isHLOC(p)) {
          _addColumnPointTo(dColumn, _date, p, p.volumefrom);

          _addHLPointTo(dHL, _date, p);
        }
      }
    });
    return {
      data: data,
      dVolume: dVolume,
      dColumn: dColumn,
      dToVolume: dToVolume,
      dHL: dHL
    };
  },
  crConfOption: function crConfOption(option) {
    return {
      zhConfig: _crZhConfig(option),
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map