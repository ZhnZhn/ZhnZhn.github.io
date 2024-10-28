import {
  isInRange,
  fCheckResponse
} from '../AdapterFn';
import {
  isTreeMap,
  isBarTreeMap,
  isCategorySeriaType
} from '../CategoryFn';

const DATA_URL = './data/ei';

const _crApiUrl = (
  option
) => {
  const { items } = option
  , metric = items[1].v
  return `${DATA_URL}/${metric}`;
}

const _crLineUrl = (
  option
) => {
  const { items } = option
  , geo = items[0].v;
  return `${_crApiUrl(option)}/${geo}.json`;
};

const _crCategoryUrl = (
  option
) => {
  const { time } = option;
  return `${_crApiUrl(option)}/by-geo-${time}.json`;
}

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

  if (!isInRange(parseInt(time), 2018, 2024)) {
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
    const { seriaType } = option
    , _isTreeMap = isTreeMap(seriaType);
    return _isTreeMap || isBarTreeMap(seriaType)
      ? _crTreeMapUrl(option, _isTreeMap)
      :  isCategorySeriaType(seriaType)
          ? _crCategoryUrl(option)
          : _crLineUrl(option);
  },
  checkResponse: fCheckResponse()
};

export default EiApi
