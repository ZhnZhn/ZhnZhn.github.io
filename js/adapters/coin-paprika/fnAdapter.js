"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _pointFn = require("../pointFn");

const {
  crError,
  ymdToUTC,
  getValue,
  joinBy,
  toUpperCaseFirst,
  crItemLink
} = _AdapterFn.default;
const DF_ID = 'btc-bitcoin';

const getCoinId = _ref => {
  let {
    items = []
  } = _ref;
  return getValue(items[0], {
    dfValue: DF_ID
  });
};

const COIN_URL = 'https://coinpaprika.com/coin',
      _crCoinUrl = option => COIN_URL + "/" + getCoinId(option) + "/",
      _crInfo = option => ({
  name: option.title || '',
  description: crItemLink('Coinpaprika', _crCoinUrl(option))
});

const fnAdapter = {
  crError,
  getValue,
  joinBy,
  toUpperCaseFirst,
  getCoinId,
  crData: arr => {
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
            _date = time_close ? ymdToUTC(time_close.split('T')[0]) : void 0;

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
  },
  addConfOption: option => ({
    info: _crInfo(option)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map