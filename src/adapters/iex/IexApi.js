
import CT from './ChartType'

const C = {
  //BASE_URL: 'https://api.iextrading.com/1.0/stock',
  BASE_URL: 'https://cloud.iexapis.com/stable/stock',
  DF_TICKET: 'AAPL',
  DF_PERIOD: '1m'
};

const _urlEarnings = (option) => {
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

const _rUrl = {
  DF: _urlChart,
  [CT.ERN]: _urlEarnings,
  [CT.DIV]: _urlDividends,
  [CT.CHART]: _urlChart
};

const IexApi = {
  getRequestUrl(option){
    const { dfType, apiKey } = option
        , _toUrl = _rUrl[dfType] || _rUrl.DF;
    return _toUrl(option)+`?token=${apiKey}`;
  },

  checkResponse(){
    return true;
  }
}

export default IexApi
