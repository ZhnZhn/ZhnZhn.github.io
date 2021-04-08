import AdapterFn from '../AdapterFn'
import IT from './ItemTypes'

const { getValue } = AdapterFn;

const C = {
  BASE_URL: 'https://cloud.iexapis.com/stable/stock',
  DF_SYMBOL: 'AAPL',
  DF_PERIOD: '1m'
};

const _assign = Object.assign;

//company, stats: symbol/dfType
const _crUrlType1 = option => {
  const { items=[], dfType } = option
  , value = getValue(items[0]);
  option.value = value
  return `${C.BASE_URL}/${value}/${dfType}`;
};

const _urlDividends = (option) => {
  const { items=[], dfPeriod } = option
  , value = getValue(items[0]);
  option.value = value
  return `${C.BASE_URL}/${value}/dividends/${dfPeriod}`;
};

const _urlChart = (option) => {
  const { items=[], one, two, value, dfPeriod } = option
  // one, two deprecated option remains for watch compatibility
  // value, dfPeriod for stock by sector
  , symbol = one || value || getValue(items[0], { dfValue: C.DF_SYMBOL})
  , period = two || dfPeriod || getValue(items[1], { dfValue: C.DF_PERIOD });
  _assign(option, { symbol, period })
  return `${C.BASE_URL}/${symbol}/chart/${period}`;
};

const _crUrlMarketList = (option) => {
  const { items=[] } = option
  , value = getValue(items[0]);
  return {
    url: `${C.BASE_URL}/market/list/${value}`,
    q: 'listLimit=20&displayPercent=true'
  };
};

const _rUrl = {
  DF: _urlChart,
  [IT.DIV]: _urlDividends,
  [IT.CHART]: _urlChart,
  [IT.COM]: _crUrlType1,
  [IT.STA]: _crUrlType1,
  [IT.ML]: _crUrlMarketList
};

const IexApi = {
  getRequestUrl(option){
    const { dfType, apiKey } = option
    , _url = (_rUrl[dfType] || _rUrl.DF)(option);
    return _url.q
      ? `${_url.url}?${_url.q}&token=${apiKey}`
      : `${_url}?token=${apiKey}`;
  },

  checkResponse(json){
    if (!json) {
      throw {
        errCaption: "Error",
        message: 'Response is empty.'
      };
    }
    return true;
  }
}

export default IexApi
