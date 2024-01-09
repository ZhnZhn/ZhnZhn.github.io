"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.kucoin.com/api/v1/market";
const _getData = json => (json || {}).data;
const _crDfUrl = option => {
  const {
      proxy,
      items = []
    } = option,
    pair = (0, _AdapterFn.getValue)(items[0]),
    timeframe = (0, _AdapterFn.getValue)(items[1]);
  option.timeframe = timeframe;
  return (0, _AdapterFn.crAllOriginsUrl)(proxy, `${API_URL}/candles?symbol=${pair}&type=${timeframe}`);
};
const _crObUrl = _ref => {
  let {
    proxy,
    items = []
  } = _ref;
  return (0, _AdapterFn.crAllOriginsUrl)(proxy, `${API_URL}/orderbook/level2_20?symbol=${(0, _AdapterFn.getValue)(items[0])}`);
};
const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
const KcApi = {
  getRequestUrl(option) {
    const {
        dfSubId
      } = option,
      _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;
    return _crUrl(option);
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_getData)
};
var _default = exports.default = KcApi;
//# sourceMappingURL=KcApi.js.map