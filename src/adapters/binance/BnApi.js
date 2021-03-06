const C = {
  URL: 'https://api.binance.com/api/v3',
  RESEARCH_URL: 'https://research.binance.com/en/projects',
  TRADE_URL: 'https://binance.com/en/trade'
};

const _isArr = Array.isArray
, REG_BLANKS = /\s/g;

const _setLinks = (option, c, s='') => {
  const _toIndex = c.indexOf('(')
  , _caption = c.substring(0, _toIndex)
      .trim()
      .toLowerCase()
      .replace(REG_BLANKS, '-')
  , _s = s.replace('/', '_').toLowerCase();
  option._researchLink = `${C.RESEARCH_URL}/${_caption}`
  option._tradeLink = `${C.TRADE_URL}/${_s}`
};

const _crSymbol = (s='') => s.replace('/','');

const _crDfUrl = option => {
  const { items=[] } = option
  , { s, c='' } = items[0]
  , { v:interval } = items[1]
  , { v:limit } = items[2]
  , _symbol = _crSymbol(s);

  _setLinks(option, c, s)
  return `${C.URL}/klines?symbol=${_symbol}&interval=${interval}&limit=${limit}`;
}

const _crObUrl = option => {
  const { items=[] } = option
  , { s } = items[0]
  , { v:limit } = items[1]
  , _symbol = _crSymbol(s);
  return `${C.URL}/depth?symbol=${_symbol}&limit=${limit}`;
}

const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};

const BnApi = {
  getRequestUrl(option){
    const { dfSubId } = option
    const _crUrl = dfSubId && _rCrUrl[dfSubId]
      || _rCrUrl.DF
    return _crUrl(option);
  },

  checkResponse(json, option){
    const { dfSubId } = option
    if (!dfSubId && _isArr(json)) {
      return true;
    }
    const { bids, asks } = json;
    if (dfSubId === 'OB' && _isArr(bids) && _isArr(asks)) {
      return true;
    }
    throw {
      errCaption: "Response Empty"
    };
  }
};

export default BnApi
