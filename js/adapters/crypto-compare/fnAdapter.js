"use strict";

exports.__esModule = true;
exports.getValue = exports.crError = exports.crData = exports.crConfOption = exports._assign = void 0;

var _AdapterFn = require("../AdapterFn");

exports.getValue = _AdapterFn.getValue;

var _crFn = require("../crFn");

exports.crError = _crFn.crError;

var _pointFn = require("../pointFn");

const _assign = Object.assign;
exports._assign = _assign;

const _crZhConfig = option => {
  const {
    linkFn,
    value
  } = option;
  return _assign((0, _AdapterFn.crZhConfig)(option), {
    linkFn,
    item: value
  });
};

const _crInfo = _ref => {
  let {
    itemCaption
  } = _ref;
  return {
    name: itemCaption
  };
};

const _isHLOC = p => (0, _AdapterFn.isTypeNumber)(p.open) && (0, _AdapterFn.isTypeNumber)(p.high) && (0, _AdapterFn.isTypeNumber)(p.low) && (0, _AdapterFn.isTypeNumber)(p.close);

const _addPointTo = (arr, d, value) => {
  if ((0, _AdapterFn.isTypeNumber)(value)) {
    //arr.push({ x: d, y: value })
    arr.push([d, value]);
  }
};

const _addColumnPointTo = (arr, date, p, volume) => {
  if ((0, _AdapterFn.isTypeNumber)(volume)) {
    arr.push((0, _pointFn.crVolumePoint)({
      date: date,
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

const _addHLPointTo = (arr, date, p) => {
  arr.push({
    x: date,
    high: (0, _AdapterFn.roundBy)(p.high - p.close, 2),
    low: (0, _AdapterFn.roundBy)(p.low - p.close, 2),
    open: p.open,
    dayHigh: p.high,
    dayLow: p.low,
    close: p.close
  });
};

const crData = json => {
  const data = [],
        dVolume = [],
        dColumn = [],
        dToVolume = [],
        dHL = [];
  json.Data.forEach(p => {
    if ((0, _AdapterFn.isTypeNumber)(p.time)) {
      const _date = p.time * 1000;

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
    data,
    dVolume,
    dColumn,
    dToVolume,
    dHL
  };
};

exports.crData = crData;

const crConfOption = option => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(option)
});

exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map