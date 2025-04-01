"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.kraken.com/0/public";
const _getData = json => {
  const {
    result
  } = json || {};
  if (!(0, _isTypeFn.isObj)(result)) {
    return;
  }
  let _propName, _data;
  for (_propName in result) {
    _data = result[_propName];
    if ((0, _isTypeFn.isArr)(_data) || (0, _isTypeFn.isObj)(_data) && (0, _isTypeFn.isArr)(_data.asks) && (0, _isTypeFn.isArr)(_data.bids)) {
      return _data;
    }
  }
};
const _crDfUrl = (pair, timeframe) => `${API_URL}/OHLC?pair=${pair}&interval=${timeframe}`;
const _crObUrl = (pair, limit) => `${API_URL}/Depth?pair=${pair}&count=${limit}`;
const KrApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl, _getData);
var _default = exports.default = KrApi;
//# sourceMappingURL=KrApi.js.map