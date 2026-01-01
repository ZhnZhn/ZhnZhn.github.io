"use strict";

exports.__esModule = true;
exports.crData = exports.crConfOption = exports.CRYPTOCOMPARE_COM = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _mathFn = require("../../math/mathFn");
var _AdapterFn = require("../AdapterFn");
var _pointFn = require("../pointFn");
const CRYPTOCOMPARE_COM = exports.CRYPTOCOMPARE_COM = 'cryptocompare.com';
const ITEM_URL = `https://${CRYPTOCOMPARE_COM}/coins`,
  CRYPTOCOMPARE_OVERVIEW = "CryptoCompare Overview",
  _crDfLinkTuple = value => value && (0, _isTypeFn.isStr)(value) ? [`${CRYPTOCOMPARE_OVERVIEW} (${value})`, `${ITEM_URL}/${value.toLowerCase()}/overview`] : [CRYPTOCOMPARE_OVERVIEW, ITEM_URL];
const _isHLOC = p => (0, _isTypeFn.isTypeNumber)(p.open) && (0, _isTypeFn.isTypeNumber)(p.high) && (0, _isTypeFn.isTypeNumber)(p.low) && (0, _isTypeFn.isTypeNumber)(p.close);
const _addPointTo = (arr, d, value) => {
  if ((0, _isTypeFn.isTypeNumber)(value)) {
    //arr.push({ x: d, y: value })
    arr.push([d, value]);
  }
};
const _addColumnPointTo = (arr, date, p, volume) => {
  if ((0, _isTypeFn.isTypeNumber)(volume)) {
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
    high: (0, _mathFn.roundBy)(p.high - p.close, 2),
    low: (0, _mathFn.roundBy)(p.low - p.close, 2),
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
    if ((0, _isTypeFn.isTypeNumber)(p.time)) {
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
  zhConfig: (0, _AdapterFn.crZhConfig)(option, (0, _AdapterFn.crDfLink)(..._crDfLinkTuple(option.value))),
  info: {
    name: option.itemCaption
  }
});
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map