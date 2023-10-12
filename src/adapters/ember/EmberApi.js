import {
  isTreeMap,
  isCategory,
  isArr,
  crError,
  getGeoCaption,
  getMetricCaption,
  getSourceValue,
  isTotalData
} from './fnAdapter';

const API_URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember'
, YEARLY_JSON = 'generation_yearly.json'
, MONTHLY_JSON = 'generation_monthly.json'
, QUERY_TAIL = '&_shape=array';

const _fCrProperty = (suffix) => (
  name,
  value
) => `${name}__${suffix}=${value}`
, _crExactProperty = _fCrProperty('exact')
, _crGteProperty = _fCrProperty('gte');

// geo, _sourceQuery
const _crQueryParams = (
  options
) => {
  const source = getSourceValue(options);
  return [
    getGeoCaption(options),
    isTotalData(source)
      ? ''
      : `&${_crExactProperty('variable', source)}`
  ];
}

const _crUrl = (
  pathToken,
  options
) => {
  const [
    geo,
    sourceQuery
  ] = _crQueryParams(options);

  return `${API_URL}/${pathToken}?${_crExactProperty('country_or_region', geo)}${QUERY_TAIL}${sourceQuery}`;
}

const DATE = 'date'
, YEAR = 'year';

const _crCategoryUrl = (
  isMonthlyRoute,
  options
) => {
  if (isMonthlyRoute) {
    options.time = options.time + '-01'
  }
  const _sourceQuery = _crQueryParams(options)[1]
  , _queryTail = `${QUERY_TAIL}${_sourceQuery}`
  , _date = options.time;

  return isMonthlyRoute
    ? `${API_URL}/${MONTHLY_JSON}?${_crExactProperty(DATE, _date)}${_queryTail}`
    : `${API_URL}/${YEARLY_JSON}?${_crExactProperty(YEAR, _date)}${_queryTail}`;
}

const _crTreeMapUrl = (
  isMonthlyRoute,
  options
) => {
  const _date = options.time
  , geo = _crQueryParams(options)[0];
  options.dfTmTitle = getMetricCaption(options)
  return `${API_URL}/${YEARLY_JSON}?${_crExactProperty(YEAR, _date)}&${_crExactProperty('country_or_region', geo)}${QUERY_TAIL}`;
}

const EmberApi = {
  getRequestUrl(options) {
    const _isMonthlyRoute = options.dfRId === 'M';

    options.pnDate = _isMonthlyRoute
      ? DATE
      : YEAR;

    return isTreeMap(options.seriaType)
      ? _crTreeMapUrl(_isMonthlyRoute, options)
      : isCategory(options.seriaType)
         ? _crCategoryUrl(_isMonthlyRoute, options)
         : _isMonthlyRoute
            ? `${_crUrl(MONTHLY_JSON, options)}&${_crGteProperty(DATE, options.fromDate)}`
            : _crUrl(YEARLY_JSON, options);
  },

  checkResponse(json) {
    if (!isArr(json)) {
      throw crError('', 'There are no data');
    }
  }
}

export default EmberApi
