import {
  isArr,
  assign,
  crError
} from '../AdapterFn';

import { getCi } from './fnAdapter';

const URL = 'https://api.worldbank.org/v2'
, NATIVE_URL = 'https://data.worldbank.org/indicator';

const api = {
  getRequestUrl(option){
    const [
      country,
      indicator
    ] = getCi(option);

    assign(option, {
      linkItem: {
        caption: 'World Bank',
        href: `${NATIVE_URL}/${indicator}?locations=${country}`
      }
    })

    return `${URL}/countries/${country}/indicators/${indicator}?date=1990:2023&format=json`;
  },

  checkResponse(json){
    if (!isArr(json)) {
      throw crError();
    }
  }
};

export default api
