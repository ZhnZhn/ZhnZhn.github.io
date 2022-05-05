"use strict";

exports.__esModule = true;
exports.default = void 0;

var _crFn = require("../crFn");

const C = {
  URL: "https://api-pub.bitfinex.com/v2"
};
const _isArr = Array.isArray;

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
  return "" + proxy + C.URL + "/candles/trade:" + timeframe + ":t" + pair + "/hist?limit=" + limit;
};

const _crObUrl = option => {
  const {
    proxy,
    items = []
  } = option,
        {
    v: pair
  } = items[0],
        {
    v: len
  } = items[1];
  return "" + proxy + C.URL + "/book/t" + pair + "/P0?len=" + len;
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
    if (!_isArr(json)) {
      throw (0, _crFn.crError)();
    }

    return true;
  }

};
var _default = BfApi;
exports.default = _default;
//# sourceMappingURL=BfApi.js.map