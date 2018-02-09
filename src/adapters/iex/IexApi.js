
const C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock',
  DF_PERIOD: '1y'
};

const _urlEarnings = (option) => {
  const { value='' } = option;
  return `${C.BASE_URL}/${value}`;
};

const _urlChart = (option) => {
  const { value='', dfPeriod=C.DF_PERIOD } = option;  
  return `${C.BASE_URL}/${value}/chart/${dfPeriod}`;
};

const _rUrl = {
  DF: _urlChart,
  earnings: _urlEarnings,
  chart: _urlChart
};

const IexApi = {
  getRequestUrl(option){
    const { dfType } = option
        , _toUrl = _rUrl[dfType] || _rUrl.DF;
    return _toUrl(option);
  },

  checkResponse(){
    return true;
  }
}

export default IexApi
