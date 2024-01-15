"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.kraken.com/0/public";
const _getData = json => {
  const {
    result
  } = json || {};
  if (!(0, _AdapterFn.isObj)(result)) {
    return;
  }
  let _propName, _data;
  for (_propName in result) {
    _data = result[_propName];
    if ((0, _AdapterFn.isArr)(_data) || (0, _AdapterFn.isObj)(_data) && (0, _AdapterFn.isArr)(_data.asks) && (0, _AdapterFn.isArr)(_data.bids)) {
      return _data;
    }
  }
};
const _crDfUrl = (pair, timeframe) => `${API_URL}/OHLC?pair=${pair}&interval=${timeframe}`;
const _crObUrl = (pair, limit) => `${API_URL}/Depth?pair=${pair}&count=${limit}`;
const _rCrUrl = {
  DF: (0, _ApiFn.fCrDfUrl)(_crDfUrl),
  OB: (0, _ApiFn.fCrObUrl)(_crObUrl)
};
const KrApi = (0, _ApiFn.fRouteApi)(_rCrUrl, _getData);
var _default = exports.default = KrApi;
//# sourceMappingURL=KrApi.js.map