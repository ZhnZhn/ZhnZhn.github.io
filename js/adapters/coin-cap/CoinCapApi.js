"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.coincap.io/v2";
const _setTitleTo = (option, title) => (0, _AdapterFn.assign)(option, {
  title
});
const _getOneTwoItemValues = option => [(0, _AdapterFn.getValue)(option.items[0]), (0, _AdapterFn.getValue)(option.items[1])];
const _crAssetListUrl = option => {
  const [offset, limit] = _getOneTwoItemValues(option);
  _setTitleTo(option, `By USD Market Cap Page: ${offset} (${limit})`);
  return `${API_URL}/assets?limit=${limit}&offset=${(parseInt(offset) - 1) * parseInt(limit)}`;
};
const _crExchangeListUrl = option => {
  const {
      items
    } = option,
    pageNumber = (0, _AdapterFn.getValue)(items[0]);
  _setTitleTo(option, `Exchange List: Page ${pageNumber}`);
  return `${API_URL}/exchanges`;
};
const _crHistoricalMarketUrl = option => {
  const [id, timeframe] = _getOneTwoItemValues(option),
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
    if (!(0, _AdapterFn.isArr)((json || {}).data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = CoinCapApi;
//# sourceMappingURL=CoinCapApi.js.map