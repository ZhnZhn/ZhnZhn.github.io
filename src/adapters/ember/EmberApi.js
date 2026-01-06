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
  crErrorByMessage
} from "../AdapterFn";
import {
  isTreeMap,
  isBarTreeMap,
  isCategory
} from "../CategoryFn";

import {
  isTsRoute,
  isUsRoute,
  crError,
  getGeoCaption,
  getMetricCaption,
  getSourceValue,
  isTotalData
} from "./fnAdapter";

import fCrLineCategoryUrl from "../fCrLineCategoryUrl";

const API_URL = "https://ember-data-api-scg3n.ondigitalocean.app/ember"
, GENERATION = "generation"
, JSON_TOKEN = "json"
, YEARLY_SUFFIX= `yearly.${JSON_TOKEN}`
, MONTHLY_SUFFIX = `monthly.${JSON_TOKEN}`
, YEARLY_JSON = `${GENERATION}_${YEARLY_SUFFIX}`
, MONTHLY_JSON = `${GENERATION}_${MONTHLY_SUFFIX}`
, US_YEARLY_JSON = `${GENERATION}_usa_${YEARLY_SUFFIX}`
, US_MONTHLY_JSON = `${GENERATION}_usa_${MONTHLY_SUFFIX}`
, QUERY_ARRAY_TAIL = "&_shape=array"
, DATE = "date"
, YEAR = "year";

const DATA_URL = "./data/ember"
, [
  _crTimeSeriesLineUrl,
  _crTimeSeriesCategoryUrl
] = fCrLineCategoryUrl(DATA_URL);

const _fCrProperty = (suffix) => (
  name,
  value
) => `${name}__${suffix}=${value}`
, _crExactProperty = _fCrProperty("exact")
, _crGteProperty = _fCrProperty("gte")
, _crDateProperty = (
  options
) => _crExactProperty(options.pnDate, options.time);

// geo, _sourceQuery
const _crSourceQueryParam = (
  option
) => {
  const source = getSourceValue(option);
  return isTotalData(source)
    ? ""
    : `&${_crExactProperty("variable", source)}`;
}

const _fCrUrl = (
  geoParamName
) => (
  pathToken,
  option
) => `${API_URL}/${pathToken}?${_crExactProperty(geoParamName, getGeoCaption(option))}${QUERY_ARRAY_TAIL}`

, _crUrl = _fCrUrl("country_or_region")
, _crUsUrl = _fCrUrl("state");

const _getPathToken = (
  isMonthlyRoute,
  option
) => {
  const [
    monthlyToken,
    yearlyToken
  ] = isUsRoute(option)
    ? [US_MONTHLY_JSON, US_YEARLY_JSON]
    : [MONTHLY_JSON, YEARLY_JSON];
  return isMonthlyRoute
    ? monthlyToken
    : yearlyToken;
};

const _crRouteApiUrl = (
  isMonthlyRoute,
  option
) => {
  const pathToken = _getPathToken(
    isMonthlyRoute,
    option
  )
  , crUrlRoute = isUsRoute(option)
     ? _crUsUrl
     : _crUrl;
  return crUrlRoute(pathToken, option);
};

const _crCategoryUrl = (
  isMonthlyRoute,
  option
) => {
  const _sourceQuery = _crSourceQueryParam(option)
  , _queryToken = `${_crDateProperty(option)}${QUERY_ARRAY_TAIL}`
  , pathToken = _getPathToken(
    isMonthlyRoute,
    option
  );

  return `${API_URL}/${pathToken}?${_queryToken}${_sourceQuery}`;
};

const _crTreeMapUrl = (
  isMonthlyRoute,
  option
) => {
  option.dfTmTitle = getMetricCaption(option);

  return `${_crRouteApiUrl(isMonthlyRoute, option)}&${_crDateProperty(option)}`;
}

const _crLineUrl = (
  isMonthlyRoute,
  option
) => {
  const queryDateParam = isMonthlyRoute
     ? `&${_crGteProperty(DATE, option.fromDate)}`
     : "";

  return `${_crRouteApiUrl(isMonthlyRoute, option)}${_crSourceQueryParam(option)}${queryDateParam}`;
};

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

  if (!isInRange(parseIntBy10(time), 2020, 2025)) {
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
    const _isMonthlyRoute = option.dfRId === "M"
    , _crUrl = isTreeMap(option) || isBarTreeMap(option)
       ? _crTreeMapUrl
       : isCategory(option)
          ? _crCategoryUrl
          : _crLineUrl;

    option.pnDate = _isMonthlyRoute
      ? DATE
      : YEAR;

    if (_isMonthlyRoute) {
      option.time = option.time + "-01"
    }

    return _crUrl(_isMonthlyRoute, option);
  },

  checkResponse(json) {
    if (!isArr(json) && !isArr((json || {}).data)) {
      throw crError();
    }
  }
}

export default EmberApi
