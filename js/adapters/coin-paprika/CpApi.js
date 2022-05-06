"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

const URL = 'https://api.coinpaprika.com/v1',
      DF_SUBTITLE = 'Values on 23:59:59 UTC';
const _isArr = Array.isArray;

const _crUrlDf = option => {
  const {
    fromDate
  } = option,
        _coinId = (0, _fnAdapter.getCoinId)(option);

  option.subtitle = DF_SUBTITLE;
  return URL + "/coins/" + _coinId + "/ohlcv/historical?start=" + fromDate + "&limit=366";
};

const _crUrlTw = option => {
  const _coinId = (0, _fnAdapter.getCoinId)(option);

  return URL + "/coins/" + _coinId + "/twitter";
};

const _crUrlCi = option => {
  const _coinId = (0, _fnAdapter.getCoinId)(option);

  return URL + "/coins/" + _coinId;
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
      return true;
    }

    throw (0, _fnAdapter.crError)();
  }

};
var _default = CpApi;
exports.default = _default;
//# sourceMappingURL=CpApi.js.map