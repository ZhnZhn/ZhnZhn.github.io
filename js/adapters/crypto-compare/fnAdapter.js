"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var valueMoving = _AdapterFn["default"].valueMoving,
    volumeColumnPoint = _AdapterFn["default"].volumeColumnPoint,
    roundBy = _AdapterFn["default"].roundBy,
    crSeria = _AdapterFn["default"].crSeria;

var _crZhConfig = function _crZhConfig(_ref) {
  var title = _ref.title,
      dataSource = _ref.dataSource,
      value = _ref.value,
      linkFn = _ref.linkFn;
  return {
    id: value,
    key: value,
    itemCaption: title,
    linkFn: linkFn,
    item: value,
    dataSource: dataSource
  };
};

var _crInfo = function _crInfo(_ref2) {
  var title = _ref2.title;
  return {
    name: title
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
    arr.push({
      x: d,
      y: value
    });
  }
};

var _addColumnPointTo = function _addColumnPointTo(arr, d, p, volume) {
  if (_isNumber(volume)) {
    arr.push(volumeColumnPoint({
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
  crSeria: crSeria,
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
  crConfigOption: function crConfigOption(_ref3) {
    var option = _ref3.option,
        data = _ref3.data;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map