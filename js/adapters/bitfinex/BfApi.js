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
  return "" + proxy + API_URL + "/candles/trade:" + timeframe + ":t" + pair + "/hist?limit=" + limit;
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
  return "" + proxy + API_URL + "/book/t" + pair + "/P0?len=" + len;
};

const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
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
    if (!(0, _AdapterFn.isArr)(json)) {
      throw (0, _AdapterFn.crError)();
    }

    return true;
  }

};
var _default = BfApi;
exports.default = _default;
//# sourceMappingURL=BfApi.js.map