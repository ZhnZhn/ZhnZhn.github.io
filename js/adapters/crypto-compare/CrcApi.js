"use strict";

exports.__esModule = true;
exports.default = void 0;
var _itemFn = require("../../utils/itemFn");
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const URL = `https://min-api.${_fnAdapter.CRYPTOCOMPARE_COM}`
  //, HD: 'data/histoday'
  ,
  QUERY_TAIL = 'extraParams=webapperc',
  DF_ID = 'BTC',
  DF_E = 'CCCAGG',
  DF_INTERVAL = 'histoday';
const _fGetParam = (index, dfValue) => items => (0, _itemFn.getValue)(items[index], dfValue),
  _getFsym = _fGetParam(0, DF_ID),
  _getE = _fGetParam(1, DF_E),
  _getInterval = _fGetParam(2, DF_INTERVAL);
const _hdUrl = option => {
  const {
      items = []
    } = option,
    value = _getFsym(items),
    exchange = _getE(items),
    interval = _getInterval(items),
    tsym = exchange === 'Binance' ? 'USDT' : 'USD';
  (0, _AdapterFn.assign)(option, {
    value,
    exchange,
    tsym
  });
  (0, _AdapterFn.setItemCaptionTo)(option, `${value}/${tsym}`);
  return `${URL}/data/${interval}?fsym=${value}&e=${exchange}&tsym=${tsym}&limit=600&${QUERY_TAIL}`;
};
const _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl
};
const CrcApi = {
  getRequestUrl(option) {
    const {
        dfSubId
      } = option,
      _crUrl = _rUrl[dfSubId] || _rUrl.DF;
    return _crUrl(option);
  },
  checkResponse(json) {
    if (!json || json.Response === 'Error') {
      throw (0, _AdapterFn.crError)('', json && json.Message);
    }
  }
};
var _default = exports.default = CrcApi;
//# sourceMappingURL=CrcApi.js.map