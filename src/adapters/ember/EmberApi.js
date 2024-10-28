import {
  isTreeMap,
  isCategorySeriaType
} from '../CategoryFn';
import {
  isArr,
  isEuRoute,
  isUsRoute,
  crError,
  getGeoCaption,
  getMetricCaption,
  getSourceValue,
  isTotalData
} from './fnAdapter';

const API_URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember'
, GENERATION = "generation"
, JSON_TOKEN = "json"
, YEARLY_SUFFIX= `yearly.${JSON_TOKEN}`
, MONTHLY_SUFFIX = `monthly.${JSON_TOKEN}`
, YEARLY_JSON = `${GENERATION}_${YEARLY_SUFFIX}`
, MONTHLY_JSON = `${GENERATION}_${MONTHLY_SUFFIX}`
, US_YEARLY_JSON = `${GENERATION}_usa_${YEARLY_SUFFIX}`
, US_MONTHLY_JSON = `${GENERATION}_usa_${MONTHLY_SUFFIX}`
, EU_MONTHLY_JSON = "price_monthly.json"
, API_URL_EU = `${API_URL}/${EU_MONTHLY_JSON}`
//, QUERY_TAIL = "&_sort=rowid&_shape=array"
, QUERY_ARRAY_TAIL = "&_shape=array"
, DATE = 'date'
, YEAR = 'year';

const _fCrProperty = (suffix) => (
  name,
  value
) => `${name}__${suffix}=${value}`
, _crExactProperty = _fCrProperty('exact')
, _crGteProperty = _fCrProperty('gte')
, _crDateProperty = (
  options
) => _crExactProperty(options.pnDate, options.time);

// geo, _sourceQuery
const _crSourceQueryParam = (
  option
) => {
  const source = getSourceValue(option);
  return isTotalData(source)
    ? ''
    : `&${_crExactProperty('variable', source)}`;
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

  return isEuRoute(option)
    ? `${API_URL_EU}?${_queryToken}`
    : `${API_URL}/${pathToken}?${_queryToken}${_sourceQuery}`;
}

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
     : '';

  return isEuRoute(option)
    ? `${API_URL_EU}?${_crExactProperty("country_or_region", getGeoCaption(option))}${queryDateParam}${QUERY_ARRAY_TAIL}`
    : `${_crRouteApiUrl(isMonthlyRoute, option)}${_crSourceQueryParam(option)}${queryDateParam}`;
};

const EmberApi = {
  getRequestUrl(option) {
    const { seriaType } = option
    , _isMonthlyRoute = option.dfRId === 'M'
    , _crUrl = isTreeMap(seriaType)
       ? _crTreeMapUrl
       : isCategorySeriaType(seriaType)
          ? _crCategoryUrl
          : _crLineUrl;

    option.pnDate = _isMonthlyRoute
      ? DATE
      : YEAR;

    if (_isMonthlyRoute) {
      option.time = option.time + '-01'
    }

    return _crUrl(_isMonthlyRoute, option);
  },

  checkResponse(json) {
    if (!isArr(json)) {
      throw crError();
    }
  }
}

export default EmberApi
