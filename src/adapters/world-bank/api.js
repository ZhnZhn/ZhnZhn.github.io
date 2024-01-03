import {
  crError,
  getCi
} from './fnAdapter';

const URL = 'https://api.worldbank.org/v2'
, NATIVE_URL = 'https://data.worldbank.org/indicator'

const _assign = Object.assign
, _isArr = Array.isArray;

const _addNativeLinkTo = (option) => {
  const { country, indicator } = getCi(option);
  _assign(option, {
    linkItem: {
      caption: 'World Bank',
      href: `${NATIVE_URL}/${indicator}?locations=${country}`
    }
  })
};

const api = {
  getRequestUrl(option){
    const {
      country,
      indicator
    } = getCi(option);
    _addNativeLinkTo(option)
    return `${URL}/countries/${country}/indicators/${indicator}?date=1990:2020&format=json`;
  },
  checkResponse(json){
    if (!_isArr(json)) {
      throw crError();
    }
  }
};

export default api
