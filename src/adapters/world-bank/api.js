import fnAdapter from './fnAdapter'

const { getCi } = fnAdapter;
const C = {
  URL: 'https://api.worldbank.org/v2',
  NATIVE_URL: 'https://data.worldbank.org/indicator'
};

const _assign = Object.assign
, _isArr = Array.isArray;

const _addNativeLinkTo = (option) => {
  const { country, indicator } = getCi(option);
  _assign(option, {
    linkItem: {
      caption: 'World Bank',
      href: `${C.NATIVE_URL}/${indicator}?locations=${country}`
    }
  })
};

const api = {
  getRequestUrl(option){
    const { country, indicator } = getCi(option);
    _addNativeLinkTo(option)
    return `${C.URL}/countries/${country}/indicators/${indicator}?date=1990:2020&format=json`;
  },
  checkResponse(json){
    return _isArr(json);
  }
};

export default api
