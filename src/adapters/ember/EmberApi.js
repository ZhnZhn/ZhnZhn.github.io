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

// geo, _sourceQuery
const _crQueryParams = (
  items
) => {
  const source = getValue(items[2]);
  return [
    getCaption(items[0]),
    isTotalData(source)
      ? ''
      : `&variable__exact=${source}`
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

  return `${API_URL}/${pathToken}?country_or_region__exact=${geo}${QUERY_TAIL}${sourceQuery}`;
}

const EmberApi = {
  getRequestUrl(options) {
    const _isMonthlyRoute = options.dfRId === 'M';

    options.pnDate = _isMonthlyRoute
      ? 'date'
      : 'year';

    if (isCategory(options.seriaType)) {
      const _sourceQuery = _crQueryParams(options.items)[1];
      return `${API_URL}/${YEARLY_JSON}?year__exact=${options.time}${QUERY_TAIL}${_sourceQuery}`;
    }

    return _isMonthlyRoute
      ? `${_crUrl(MONTHLY_JSON, options)}&date__gte=${options.fromDate}`
      : _crUrl(YEARLY_JSON, options);
  },

  checkResponse(json) {
    if (!isArr(json)) {
      throw crError('', 'There are no data');
    }
  }
}

export default EmberApi
