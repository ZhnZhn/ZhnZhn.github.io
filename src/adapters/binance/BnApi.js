import dt from '../../utils/DateUtils'

const C = {
  URL: 'https://api.binance.com/api/v3/klines?interval=1d',
  RESEARCH_URL: 'https://research.binance.com/en/projects',
  TRADE_URL: 'https://binance.com/en/trade'
}

const _isArr = Array.isArray;

const _crDays = ({ fromDate }) => {
  const _d = dt.getDaysFromYmd(fromDate);
  return _d < 1001 ? _d : 1000;
};

const _setLinks = (option, c, s) => {
  const _toIndex = c.indexOf('(')
  , _caption = c.substring(0, _toIndex)
      .trim()
      .toLowerCase()
      .replace(' ', '-')
  , _s = s.replace('/', '_').toLowerCase();
  option._researchLink = `${C.RESEARCH_URL}/${_caption}`
  option._tradeLink = `${C.TRADE_URL}/${_s}`
}

const BnApi = {
  getRequestUrl(option){
    const { items=[] } = option
    , { s='', c='' } = items[0] || {}
    , _symbol = s.replace('/','')
    , _limit = _crDays(option);
    _setLinks(option, c, s)
    return `${C.URL}&symbol=${_symbol}&limit=${_limit}`;
  },

  checkResponse(json, option){
    if (_isArr(json)) {
      return true;
    }
    throw {
      errCaption: "Response Empty",
    };
  }
}

export default BnApi
