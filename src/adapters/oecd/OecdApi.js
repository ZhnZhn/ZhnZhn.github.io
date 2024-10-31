import { isCategory } from '../CategoryFn';
import { crItemId } from './fnAdapter';

const API_URL = "https://sdmx.oecd.org/public/rest/data";

const OecdApi = {
  getRequestUrl(option){
    const {
      time
    } = option
    , _isCategory = isCategory(option)
    , queryDate = _isCategory
        ? `startPeriod=${time}&endPeriod=${time}`
        : "startPeriod=2005";
    return `${API_URL}/${option.dfDs}/${crItemId(_isCategory, option.items)}?${queryDate}&format=jsondata`;
  }
};

export default OecdApi
