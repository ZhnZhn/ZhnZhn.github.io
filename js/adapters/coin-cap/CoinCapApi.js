"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.coincap.io/v2";
const _setTitleTo = (option, title) => (0, _AdapterFn.assign)(option, {
  title
});
const _crAssetListUrl = option => {
  const [offset, limit] = (0, _AdapterFn.getValues)(option);
  _setTitleTo(option, `By USD Market Cap Page: ${offset} (${limit})`);
  return `${API_URL}/assets?limit=${limit}&offset=${((0, _isTypeFn.parseIntBy10)(offset) - 1) * (0, _isTypeFn.parseIntBy10)(limit)}`;
};
const _crExchangeListUrl = option => {
  const _pageNumber = (0, _isTypeFn.parseIntBy10)((0, _AdapterFn.getValues)(option)[0]) || 1;
  option.pageNumber = _pageNumber;
  _setTitleTo(option, `Exchange List: Page ${_pageNumber}`);
  return `${API_URL}/exchanges`;
};
const _crHistoricalMarketUrl = option => {
  const [id, timeframe] = (0, _AdapterFn.getValues)(option),
    {
      fromDate
    } = option,
    _queryPeriod = timeframe === "d1" && fromDate ? `&start=${(0, _AdapterFn.ymdToUTC)(fromDate)}&end=${Date.now()}` : "";
  (0, _AdapterFn.setItemCaptionTo)(option, `${option.items[0].s}/USD`);
  return `${API_URL}/assets/${id}/history?interval=${timeframe}${_queryPeriod}`;
};
const getCrUrl = (0, _AdapterFn.crGetRoute)({
  MCL: _crAssetListUrl,
  EVL: _crExchangeListUrl,
  HMC: _crHistoricalMarketUrl
});
const CoinCapApi = {
  getRequestUrl(option) {
    return getCrUrl(option.dfSubId)(option);
  },
  checkResponse(json) {
    if (!(0, _isTypeFn.isArr)((json || {}).data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = CoinCapApi;
//# sourceMappingURL=CoinCapApi.js.map