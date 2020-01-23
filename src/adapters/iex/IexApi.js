
import CT from './ChartType'

const C = {
  //BASE_URL: 'https://api.iextrading.com/1.0/stock',
  BASE_URL: 'https://cloud.iexapis.com/stable/stock',
  DF_TICKET: 'AAPL',
  DF_PERIOD: '1m'
};

//earning, company, stats : symbol/suffix
const _crUrlType1 = option => {
  const { value='' } = option;
  return `${C.BASE_URL}/${value}`;
};

const _urlDividends = (option) => {
  const {
    value='',
    dfPeriod
  } = option;
  return `${C.BASE_URL}/${value}/dividends/${dfPeriod}`;
};

const _urlChart = (option) => {
  const {
    one, ticket,
    two, dfPeriod
  } = option
  , _ticket = one || ticket || C.DF_TICKET
  , _period = two || dfPeriod || C.DF_PERIOD;
  option.one = _ticket
  option.two = _period
  return `${C.BASE_URL}/${_ticket}/chart/${_period}`;
};

const _crUrlMarketList = (option) => {  
  const { value } = option;
  return {
    url: `${C.BASE_URL}/market/list/${value}`,
    q: 'listLimit=20&displayPercent=true'
  };
};

const _rUrl = {
  DF: _urlChart,
  [CT.ERN]: _crUrlType1,
  [CT.DIV]: _urlDividends,
  [CT.CHART]: _urlChart,
  [CT.COM]: _crUrlType1,
  [CT.STA]: _crUrlType1,
  [CT.ML]: _crUrlMarketList
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
