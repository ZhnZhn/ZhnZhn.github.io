const C = {
  URL: 'https://api.binance.com/api/v3/klines',
  RESEARCH_URL: 'https://research.binance.com/en/projects',
  TRADE_URL: 'https://binance.com/en/trade'
};

const _isArr = Array.isArray;

const _setLinks = (option, c, s) => {
  const _toIndex = c.indexOf('(')
  , _caption = c.substring(0, _toIndex)
      .trim()
      .toLowerCase()
      .replace(' ', '-')
  , _s = s.replace('/', '_').toLowerCase();
  option._researchLink = `${C.RESEARCH_URL}/${_caption}`
  option._tradeLink = `${C.TRADE_URL}/${_s}`
};

const BnApi = {
  getRequestUrl(option){
    const { items=[] } = option
    , { s='', c='' } = items[0]
    , { v:interval } = items[1]
    , { v:limit } = items[2]
    , _symbol = s.replace('/','');

    _setLinks(option, c, s)
    return `${C.URL}?symbol=${_symbol}&interval=${interval}&limit=${limit}`;
  },

  checkResponse(json, option){
    if (_isArr(json)) {
      return true;
    }
    throw {
      errCaption: "Response Empty"
    };
  }
};

export default BnApi
