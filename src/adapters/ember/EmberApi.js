import {
  isArr,
  parseIntBy10
} from '../../utils/isTypeFn';
import {
  getValue,
  getCaption
} from '../../utils/itemFn';

import {
  isInRange
} from '../../math/mathFn';

import {
  crError,
  crErrorByMessage
} from "../AdapterFn";
import {
  isTreeMap,
  isBarTreeMap,
  isCategory
} from "../CategoryFn";

import fCrLineCategoryUrl from "../fCrLineCategoryUrl";

const DATA_URL = "./data/ember"
, [
  _crTimeSeriesLineUrl,
  _crTimeSeriesCategoryUrl
] = fCrLineCategoryUrl(DATA_URL)
, isTsRoute = ({
  dfId
}) => dfId === "EU"
  || dfId === "EG"
  || dfId === "UEG"
  || dfId === "PV"
  || dfId === "WS";

const _crTimeSeriesTreeMapUrl = (
  option,
  _isTreeMap
) => {
  const {
    items,
    time
  } = option
  , geo = getValue(items[0])
  , metricItem = items[2]
  , metricCaption = getCaption(metricItem)
  , metricValue = getValue(metricItem);

  if (metricItem.isTm !== 1) {
    throw crErrorByMessage(`TreeMap and Bar charts by Source for ${metricCaption} not available`)
  }

  if (!isInRange(parseIntBy10(time), 2020, 2026)) {
    const _typeOfChartToken = _isTreeMap
      ? 'TreeMap'
      : 'Bar by Source';
    throw crErrorByMessage(`${_typeOfChartToken} only available for 2021-2024`);
  }

  if (!_isTreeMap) {
    option.subtitle = option.title
    option.title = metricCaption
  }

  return `${DATA_URL}/${metricValue}-tm/${geo}-${time}.json`;
}

const EmberApi = {
  getRequestUrl(option) {
    if (isTsRoute(option)) {
      const _isTreeMap = isTreeMap(option);
      return _isTreeMap || isBarTreeMap(option)
        ? _crTimeSeriesTreeMapUrl(option, _isTreeMap)
        : isCategory(option)
        ? _crTimeSeriesCategoryUrl(option)
        : _crTimeSeriesLineUrl(option);
    }
    throw crErrorByMessage('Api route does not exist');
  },

  checkResponse(json) {
    if (!isArr(json?.data)) {
      throw crError();
    }
  }
}

export default EmberApi
