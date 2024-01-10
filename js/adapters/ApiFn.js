"use strict";

exports.__esModule = true;
exports.fRouteApi = exports.fGetRequestUrl = exports.crAllOriginsUrl = void 0;
var _AdapterFn = require("./AdapterFn");
const _isStr = v => typeof v === "string";
const crAllOriginsUrl = (proxyServer, url) => proxyServer ? `${proxyServer}${url}` : `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
exports.crAllOriginsUrl = crAllOriginsUrl;
const FN_IDENTITY = v => v;
const _getBlockchainData = function (json, getData) {
  if (getData === void 0) {
    getData = FN_IDENTITY;
  }
  return getData(json && _isStr(json.contents) ? JSON.parse(json.contents) : json);
};
const _fCheckResponse = getData => (json, option) => {
  try {
    const _data = _getBlockchainData(json, getData);
    if ((0, _AdapterFn.isArr)(_data) || _data && (0, _AdapterFn.isArr)(_data.asks) && (0, _AdapterFn.isArr)(_data.bids)) {
      return _data;
    }
    throw (0, _AdapterFn.crError)();
  } catch (err) {
    throw (0, _AdapterFn.crError)();
  }
};
const fGetRequestUrl = rCrUrl => option => {
  const {
      dfSubId
    } = option,
    _crUrl = dfSubId && rCrUrl[dfSubId] || rCrUrl.DF;
  return _crUrl(option);
};
exports.fGetRequestUrl = fGetRequestUrl;
const fRouteApi = (rCrUrl, getData) => ({
  getRequestUrl: fGetRequestUrl(rCrUrl),
  checkResponse: _fCheckResponse(getData)
});
exports.fRouteApi = fRouteApi;
//# sourceMappingURL=ApiFn.js.map