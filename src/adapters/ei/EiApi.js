import { parseIntBy10 } from '../../utils/isTypeFn';

import {
  isInRange,
  fCheckResponse
} from '../AdapterFn';
import {
  isTreeMap,
  isBarTreeMap,
  isCategory
} from '../CategoryFn';

import fCrLineCategoryUrl from '../fCrLineCategoryUrl';

const DATA_URL = './data/ei';
const [
  _crLineUrl,
  _crCategoryUrl
] = fCrLineCategoryUrl(DATA_URL);

const _crTreeMapUrl = (
  option,
  _isTreeMap
) => {
  const {
    items,
    time,
    dfTmToken
  } = option
  , geo = items[0].v;

  if (!isInRange(parseIntBy10(time), 2018, 2025)) {
    const _typeOfChartToken = _isTreeMap
      ? 'TreeMap'
      : 'Bar by metric';
    throw {
      message: `${_typeOfChartToken} only available for 2019-2023`
    };
  }

  if (!_isTreeMap) {
    option.subtitle = option.title
    option.title = option.dfTmTitle
  }

  return `${DATA_URL}/${dfTmToken}-tm/${geo}-${time}.json`;
}

const EiApi = {
  getRequestUrl(option){
    const _isTreeMap = isTreeMap(option);
    return _isTreeMap || isBarTreeMap(option)
      ? _crTreeMapUrl(option, _isTreeMap)
      :  isCategory(option)
          ? _crCategoryUrl(option)
          : _crLineUrl(option);
  },
  checkResponse: fCheckResponse()
};

export default EiApi
