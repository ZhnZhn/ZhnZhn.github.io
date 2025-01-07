import {
  getFromDate,
  getValue,
  fCheckResponse
} from '../AdapterFn';

const API_URL = "https://api.polygon.io/v2";
const TO_DATE = getFromDate(0)

export const PlgApi = {
  getRequestUrl(option){
    const {
      apiKey,
      items,
      fromDate
    } = option
    , item1 = getValue(items[0], {isUpper: true});

    option.apiKey = null
    option.itemCaption = item1

    return `${API_URL}/aggs/ticker/${item1}/range/1/day/${fromDate}/${TO_DATE}?adjusted=true&sort=asc&apiKey=${apiKey}`;
  },

  checkResponse: fCheckResponse(json => (json || {}).results)
}
