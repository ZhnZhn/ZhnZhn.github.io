import { crProviderApi } from '../ApiFn';
import { isCategory } from '../CategoryFn';

import { crItemId } from './fnAdapter';

const API_URL = "https://sdmx.oecd.org/public/rest/data";

const _crCategoryQueryDate = (
  time
) => `startPeriod=${time}&endPeriod=${time}`
, getRequestUrl = (option) => {
  const queryDate = isCategory(option)
    ? _crCategoryQueryDate(option.time)
    : "startPeriod=2005";
  return `${API_URL}/${option.dfDs}/${crItemId(option)}?${queryDate}&format=jsondata`;
}
, OecdApi = crProviderApi(
  getRequestUrl,
  null
);

export default OecdApi
