import { getValue } from '../AdapterFn';
import { isCategory } from '../CategoryFn';
const API_URL = "https://sdmx.oecd.org/public/rest/data";

const OecdApi = {
  getRequestUrl(option){
    const {
      items,
      time
    } = option
    , _isCategory = isCategory(option)
    , _item0 = _isCategory
       ? ""
       : getValue(items[0])
    , queryDate = _isCategory
        ? `startPeriod=${time}&endPeriod=${time}`
        : "startPeriod=2005";
    return `${API_URL}/${option.dfDs}/${_item0}.Q.${getValue(items[1])}.IX?${queryDate}&format=jsondata`;
  }
};

export default OecdApi
