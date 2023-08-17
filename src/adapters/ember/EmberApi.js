import {
  isCategory,
  isArr,
  crError,
  getCaption,
  getValue,
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
  items
) => {
  const source = getValue(items[2]);
  return [
    getCaption(items[0]),
    isTotalData(source)
      ? ''
      : `&${_crExactProperty('variable', source)}`
  ];
}

const _crUrl = (
  pathToken,
  options
) => {
  const {
    items
  } = options
  , [
    geo,
   sourceQuery
 ] = _crQueryParams(items);

  return `${API_URL}/${pathToken}?${_crExactProperty('country_or_region', geo)}${QUERY_TAIL}${sourceQuery}`;
}

const DATE = 'date'
, YEAR = 'year';

const EmberApi = {
  getRequestUrl(options) {
    const _isMonthlyRoute = options.dfRId === 'M';

    options.pnDate = _isMonthlyRoute
      ? DATE
      : YEAR;

    if (isCategory(options.seriaType)) {
      const _sourceQuery = _crQueryParams(options.items)[1];
      return `${API_URL}/${YEARLY_JSON}?${_crExactProperty(YEAR, options.time)}${QUERY_TAIL}${_sourceQuery}`;
    }

    return _isMonthlyRoute
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
