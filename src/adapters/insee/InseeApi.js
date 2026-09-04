import { isArr } from '../../utils/isTypeFn';
import { getValue } from '../../utils/itemFn';

import {
  crProviderApi,
  checkResponseIsStr
} from '../ApiFn';

const DATA_URL = 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM';
const _crUrl = (
  option
) => `${DATA_URL}/${option.value}?startPeriod=${option.fromDate}`;

const getRequestUrl = (option) => {
  const { items } = option;
  if (isArr(items)) {
    const value = getValue(items[0]);
    option.value = value
    option.itemCaption = value
    return _crUrl(option);
  }
  return `${_crUrl(option)}&endPeriod=${option.toDate}`;
}
, InseeApi = crProviderApi(
  getRequestUrl,
  checkResponseIsStr
);

export default InseeApi
