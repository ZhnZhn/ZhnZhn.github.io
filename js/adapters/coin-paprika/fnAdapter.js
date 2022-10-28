"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = exports.joinBy = exports.getCoinId = exports.crError = exports.crData = exports.addConfOption = void 0;

var _AdapterFn = require("../AdapterFn");

exports.getValue = _AdapterFn.getValue;
exports.joinBy = _AdapterFn.joinBy;
exports.toUpperCaseFirst = _AdapterFn.toUpperCaseFirst;
exports.crError = _AdapterFn.crError;

var _crFn = require("../crFn");

var _pointFn = require("../pointFn");

const DF_ID = 'btc-bitcoin';

const _getCoinId = _ref => {
  let {
    items = []
  } = _ref;
  return (0, _AdapterFn.getValue)(items[0], {
    dfValue: DF_ID
  });
};

const COIN_URL = 'https://coinpaprika.com/coin',
      _crCoinUrl = option => COIN_URL + "/" + _getCoinId(option) + "/",
      _crInfo = option => ({
  name: option.title || '',
  description: (0, _crFn.crItemLink)('Coinpaprika', _crCoinUrl(option))
});

const getCoinId = _getCoinId;
exports.getCoinId = getCoinId;

const crData = arr => {
  const data = [],
        dColumn = [],
        dVolume = [],
        dMarketCap = [];
  arr.forEach(item => {
    const {
      time_close,
      close,
      open,
      low,
      high,
      volume,
      market_cap
    } = item,
          _date = time_close ? (0, _AdapterFn.ymdToUTC)(time_close.split('T')[0]) : void 0;

    if (_date) {
      data.push([_date, close]);
      dVolume.push([_date, volume]);
      dColumn.push((0, _pointFn.crVolumePoint)({
        date: _date,
        open,
        close,
        volume,
        option: {
          _high: high,
          _low: low
        }
      }));
      dMarketCap.push([_date, market_cap]);
    }
  });
  return {
    data,
    dVolume,
    dColumn,
    dMarketCap
  };
};

exports.crData = crData;

const addConfOption = option => ({
  info: _crInfo(option)
});

exports.addConfOption = addConfOption;
//# sourceMappingURL=fnAdapter.js.map