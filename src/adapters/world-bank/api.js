import {
  isArr,
  assign,
  crError
} from '../AdapterFn';
import {
  isCategory
} from '../CategoryFn';

import { getCi } from './fnAdapter';

const URL = 'https://api.worldbank.org/v2'
, NATIVE_URL = 'https://data.worldbank.org/indicator'
, _crCountryIndicatorToken = (
  country,
  indicator
) => `countries/${country}/indicators/${indicator}`;

const api = {
  getRequestUrl(option){
    const [
      country,
      indicator
    ] = getCi(option)
    , _isCategory = isCategory(option)
    , _locations = _isCategory ? "1W" : country;

    assign(option, {
      linkItem: {
        caption: 'World Bank',
        href: `${NATIVE_URL}/${indicator}?locations=${_locations}`
      }
    })

    return _isCategory
      ? `${URL}/${_crCountryIndicatorToken("all", indicator)}?date=${option.time}&format=json&per_page=305`
      : `${URL}/${_crCountryIndicatorToken(country, indicator)}?date=1990:2023&format=json`;
  },

  checkResponse(json){
    if (!isArr(json)) {
      throw crError();
    }
  }
};

export default api
