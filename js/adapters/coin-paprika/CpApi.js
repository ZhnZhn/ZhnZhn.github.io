"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const URL = 'https://api.coinpaprika.com/v1';
const _isArr = Array.isArray;
const _crUrlDf = option => {
  const {
      fromDate
    } = option,
    _coinId = (0, _fnAdapter.getCoinId)(option);
  (0, _AdapterFn.setItemCaptionTo)(option, `${(0, _AdapterFn.crShortItemCaption)(option.title)}/USD`);
  return `${URL}/tickers/${_coinId}/historical?start=${fromDate}&interval=1d`;
};
const _crUrlTw = option => {
  const _coinId = (0, _fnAdapter.getCoinId)(option);
  return `${URL}/coins/${_coinId}/twitter`;
};
const _crUrlCi = option => {
  const _coinId = (0, _fnAdapter.getCoinId)(option);
  return `${URL}/coins/${_coinId}`;
};
const _rApi = {
  DF: _crUrlDf,
  TW: _crUrlTw,
  CI: _crUrlCi
};
const CpApi = {
  getRequestUrl(option) {
    const {
        dfSubId
      } = option,
      _crUrl = _rApi[dfSubId] || _rApi.DF;
    return option._itemUrl = _crUrl(option);
  },
  checkResponse(json, option) {
    const {
      dfSubId
    } = option;
    if (_isArr(json) || dfSubId === 'CI' && json) {
      return json;
    }
    throw (0, _AdapterFn.crError)();
  }
};
var _default = exports.default = CpApi;
//# sourceMappingURL=CpApi.js.map