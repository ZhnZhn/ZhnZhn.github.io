import { isCategory } from '../CategoryFn';
import { crItemId } from './fnAdapter';

const API_URL = "https://sdmx.oecd.org/public/rest/data";

const OecdApi = {
  getRequestUrl(option){
    const {
      time
    } = option
    , queryDate = isCategory(option)
        ? `startPeriod=${time}&endPeriod=${time}`
        : "startPeriod=2005";
    return `${API_URL}/${option.dfDs}/${crItemId(option)}?${queryDate}&format=jsondata`;
  }
};

export default OecdApi
