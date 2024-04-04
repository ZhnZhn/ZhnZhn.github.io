"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://api.coingecko.com/api/v3',
  COINS_API_URL = API_URL + "/coins",
  EXCHANGES_API_URL = API_URL + "/exchanges",
  PAGE_URL = 'https://www.coingecko.com/en/coins';
const _setTitleAndItemUrlTo = (option, title, _itemUrl) => (0, _AdapterFn.assign)(option, {
  title,
  _itemUrl
});
const _assignDf = option => {
  const [item1, item2] = option.items,
    {
      c,
      v: value,
      s
    } = item1,
    {
      v: _currency
    } = item2,
    _vs = s + "/" + _currency,
    _days = Math.min(Math.max((0, _AdapterFn.getDaysFromYmd)(option.fromDate), 91), 365);
  (0, _AdapterFn.assign)(option, {
    itemCaption: _vs,
    subtitle: 'Values on 00:00 GMT',
    _currency: _currency,
    _nativeUrl: PAGE_URL + "/" + value
  });
  _setTitleAndItemUrlTo(option, c, COINS_API_URL + "/" + value + "/market_chart?vs_currency=" + _currency + "&days=" + _days);
};
const _assignMcl = option => {
  const [page, perPage, currency] = (0, _fnAdapter.crPageConfig)(option);
  _setTitleAndItemUrlTo(option, "By Market Cap Page: " + page + " (" + perPage + ")", COINS_API_URL + "/markets?order=market_cap_desc&page=" + page + "&per_page=" + perPage + "&vs_currency=" + currency + "&price_change_percentage=1h,7d,30d,1y");
};
const _assignEl = option => {
  const [page, perPage] = (0, _fnAdapter.crPageConfig)(option);
  _setTitleAndItemUrlTo(option, "By Exchages Page: " + page + " (" + perPage + ")", EXCHANGES_API_URL + "?page=" + page + "&per_page=" + perPage);
};
const _assignEv = option => {
  const items = option.items;
  _setTitleAndItemUrlTo(option, (0, _AdapterFn.getCaption)(items[0]) + " historical trading volume in BTC", EXCHANGES_API_URL + "/" + (0, _AdapterFn.getValue)(items[0]) + "/volume_chart?days=" + (0, _AdapterFn.getValue)(items[1]));
};
const _rAssign = {
  DF: _assignDf,
  MCL: _assignMcl,
  EL: _assignEl,
  EV: _assignEv
};
const CgApi = {
  getRequestUrl(option) {
    (_rAssign[option.dfSubId] || _rAssign.DF)(option);
    return option._itemUrl;
  },
  checkResponse(json, option) {
    const {
      dfSubId
    } = option;
    if ((dfSubId === 'MCL' || dfSubId === 'EL' || dfSubId === 'EV') && (0, _AdapterFn.isArr)(json) && json.length > 1) {
      return json;
    }
    if (json && (0, _AdapterFn.isArr)(json.prices)) {
      return json;
    }
    throw (0, _AdapterFn.crError)();
  }
};
var _default = exports.default = CgApi;
//# sourceMappingURL=CgApi.js.map