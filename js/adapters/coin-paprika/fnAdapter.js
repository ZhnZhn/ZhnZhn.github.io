"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = exports.joinBy = exports.getCoinId = exports.crError = exports.crData = exports.addConfOption = void 0;
var _AdapterFn = require("../AdapterFn");
exports.getValue = _AdapterFn.getValue;
exports.joinBy = _AdapterFn.joinBy;
exports.toUpperCaseFirst = _AdapterFn.toUpperCaseFirst;
exports.crError = _AdapterFn.crError;
var _crFn = require("../crFn");
const DF_ID = 'btc-bitcoin',
  _crItemLink = (0, _crFn.fCrItemLinkByCaption)('Coinpaprika'),
  _getCoinId = _ref => {
    let {
      items = []
    } = _ref;
    return (0, _AdapterFn.getValue)(items[0], {
      dfValue: DF_ID
    });
  };
const COIN_URL = 'https://coinpaprika.com/coin',
  _crCoinUrl = option => `${COIN_URL}/${_getCoinId(option)}/`,
  _crInfo = option => ({
    name: option.title || '',
    description: _crItemLink(_crCoinUrl(option))
  });
const getCoinId = exports.getCoinId = _getCoinId;
const crData = arr => {
  const data = [],
    dVolume = [],
    dMarketCap = [];
  arr.forEach(item => {
    const {
        timestamp,
        price,
        volume_24h,
        market_cap
      } = item,
      _date = timestamp ? (0, _AdapterFn.ymdToUTC)(timestamp.split('T')[0]) : 0;
    if (_date) {
      data.push([_date, price]);
      dVolume.push([_date, volume_24h]);
      dMarketCap.push([_date, market_cap]);
    }
  });
  return {
    data,
    dVolume,
    dMarketCap
  };
};
exports.crData = crData;
const addConfOption = option => ({
  info: _crInfo(option)
});
exports.addConfOption = addConfOption;
//# sourceMappingURL=fnAdapter.js.map