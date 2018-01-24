
const C = {
  BASE_URL: 'https://api.iextrading.com/1.0/stock'
};

const _urlEarnings = (option) => {
  const { value='' } = option;
  return `${C.BASE_URL}/${value}`;
};

const _urlChart = (option) => {
  const { value='' } = option;
  return `${C.BASE_URL}/${value}/chart/5y`;
}

const _rUrl = {
  DF: _urlChart,
  earnings: _urlEarnings,
  chart: _urlChart
}

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
