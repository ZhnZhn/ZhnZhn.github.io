"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.binance.com/api/v3',
  RESEARCH_URL = 'https://research.binance.com/en/projects',
  TRADE_URL = 'https://binance.com/en/trade';
const REG_BLANKS = /\s/g;
const _setLinks = function (option, c, s) {
  if (s === void 0) {
    s = '';
  }
  const _toIndex = c.indexOf('('),
    _caption = c.substring(0, _toIndex).trim().toLowerCase().replace(REG_BLANKS, '-'),
    _s = s.replace('/', '_').toLowerCase();
  option._researchLink = `${RESEARCH_URL}/${_caption}`;
  option._tradeLink = `${TRADE_URL}/${_s}`;
};
const _crSymbol = function (s) {
  if (s === void 0) {
    s = '';
  }
  return s.replace('/', '');
};
const _crDfUrl = option => {
  const {
      items = []
    } = option,
    {
      s,
      c = ''
    } = items[0],
    {
      v: interval
    } = items[1],
    {
      v: limit
    } = items[2],
    _symbol = _crSymbol(s);
  _setLinks(option, c, s);
  return `${API_URL}/klines?symbol=${_symbol}&interval=${interval}&limit=${limit}`;
};
const _crObUrl = option => {
  const {
      items = []
    } = option,
    {
      s
    } = items[0],
    {
      v: limit
    } = items[1],
    _symbol = _crSymbol(s);
  return `${API_URL}/depth?symbol=${_symbol}&limit=${limit}`;
};
const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
const BnApi = {
  getRequestUrl(option) {
    const {
      dfSubId
    } = option;
    const _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;
    return _crUrl(option);
  },
  checkResponse(json, option) {
    const {
      dfSubId
    } = option;
    if (!dfSubId && (0, _AdapterFn.isArr)(json)) {
      return json;
    }
    const {
      bids,
      asks
    } = json;
    if (dfSubId === 'OB' && (0, _AdapterFn.isArr)(bids) && (0, _AdapterFn.isArr)(asks)) {
      return json;
    }
    throw (0, _AdapterFn.crError)();
  }
};
var _default = exports.default = BnApi;
//# sourceMappingURL=BnApi.js.map