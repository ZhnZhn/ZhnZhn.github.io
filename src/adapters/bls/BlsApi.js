import fnAdapter from './fnAdapter';

const C = {
  URL: 'https://api.bls.gov/publicAPI',
  TS_DATA: 'timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};

const _isArr = Array.isArray
, _assign = Object.assign
, { crError, crTitle, getYear, getCurrentYear } = fnAdapter
, _isNumber = n => typeof n === 'number' && n-n === 0;

const _getValue = ({ items=[] }) => items[0].v;

const _addNativeLinkTo = (option) => {
  const value = _getValue(option);
  _assign(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
      href: `${C.NATIVE_URL}/${value}`
    }
  })
};

const _setCaptionTo = option => {
  const { title } = option;
  _assign(option, {
    itemCaption: title,
    title: crTitle(option),
    subtitle: title
  })
};

const _crQueryKey = ({ apiKey }) => apiKey
  ? `?registrationkey=${apiKey}`
  : ''

const _crQueryPeriod = (queryKey, {fromDate}) => {
  if (!queryKey) { return ''; }
  const _startyear = parseInt(getYear(fromDate), 10)
  , _endyear = parseInt(getCurrentYear(), 10);
  if (_isNumber(_startyear) && _isNumber(_endyear)
      && _endyear - _startyear < 21) {
    return `&startyear=${_startyear}&endyear=${_endyear}`;
  }
  return '';
};

const BlsApi = {

  getRequestUrl(option){
    const value = _getValue(option)
    , _queryKey = _crQueryKey(option)
    , _v = _queryKey ? 'v2' : 'v1'
    , _queryPeriod = _crQueryPeriod(_queryKey, option);
    _addNativeLinkTo(option)
    _setCaptionTo(option)
    return `${C.URL}/${_v}/${C.TS_DATA}/${value}${_queryKey}${_queryPeriod}`;
  },

  checkResponse(json){
    const { Results, message=[] } = json || {}
    , { series } = Results || {}
    , _s = (series || [])[0];
    if (_s && _isArr(_s.data)){
      return true;
    }
    throw crError('', message[0]);
  }
}

export default BlsApi
