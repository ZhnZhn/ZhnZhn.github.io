"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api-pub.bitfinex.com/v2";
const _crDfUrl = option => {
  const {
      proxy,
      items = []
    } = option,
    {
      v: pair
    } = items[0],
    {
      v: timeframe
    } = items[1],
    {
      v: limit
    } = items[2];
  option.timeframe = timeframe;
  return (0, _AdapterFn.crAllOriginsUrl)(proxy, `${API_URL}/candles/trade:${timeframe}:t${pair}/hist?limit=${limit}`);
};
const _crObUrl = _ref => {
  let {
    proxy,
    items = []
  } = _ref;
  const {
      v: pair
    } = items[0],
    {
      v: len
    } = items[1];
  return (0, _AdapterFn.crAllOriginsUrl)(proxy, `${API_URL}/book/t${pair}/P0?len=${len}`);
};
const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
const _getData = json => {
  if ((0, _AdapterFn.isArr)(json)) {
    return json;
  }
  const _data = JSON.parse(json.contents);
  return (0, _AdapterFn.isArr)(_data) ? _data : void 0;
};
const BfApi = {
  getRequestUrl(option) {
    const {
        dfSubId
      } = option,
      _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;
    return _crUrl(option);
  },
  checkResponse(json, option) {
    try {
      const _json = _getData(json);
      if (!(0, _AdapterFn.isArr)(_json)) {
        throw (0, _AdapterFn.crError)();
      }
      return _json;
    } catch (err) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = BfApi;
//# sourceMappingURL=BfApi.js.map