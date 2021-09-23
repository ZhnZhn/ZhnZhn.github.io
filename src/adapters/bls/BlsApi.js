import fnAdapter from './fnAdapter';

const C = {
  URL: 'https://api.bls.gov/publicAPI',
  TS_DATA: 'timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};

const _isArr = Array.isArray
, _assign = Object.assign
, { crHm, crError, getYear, getCurrentYear } = fnAdapter
, _isNumber = n => typeof n === 'number' && n-n === 0;

const _crCuId = items =>
  `CU${items[2].v}R${items[1].v}${items[0].v}`;

const _hmCrId = crHm({
  CU: _crCuId
});

const _getSeriaId = ({ items=[], dfCode }) => {
  const _crId = _hmCrId[dfCode];
  return _crId
    ? _crId(items)
    : items[0].v;
};

const _addNativeLinkTo = (option, seriaId) => {
  _assign(option, {
    linkItem: {
      caption: 'U.S. BLS Data Link',
      href: `${C.NATIVE_URL}/${seriaId}`
    }
  })
};


const _crCuCaption = (dfTitle, items) => ({
  title: `${dfTitle}, ${items[2].c}`,
  subtitle: `${items[1].c}: ${items[0].c}`
});

const _hmCrCaption = crHm({
  CU: _crCuCaption
})

const _crCaption = ({
  dfCode,
  dfTitle,
  title,
  subtitle,
  items
}) => {
  const _crC = _hmCrCaption[dfCode];
  return _crC
    ? _crC(dfTitle, items)
    : {
      title: dfTitle || subtitle,
      subtitle: title
    };
};

const _setCaptionTo = option => {
  const { title } = option;
  _assign(option, {
    itemCaption: title,
    ..._crCaption(option)
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
    const seriaId = _getSeriaId(option)
    , _queryKey = _crQueryKey(option)
    , _v = _queryKey ? 'v2' : 'v1'
    , _queryPeriod = _crQueryPeriod(_queryKey, option);
    _addNativeLinkTo(option, seriaId)
    _setCaptionTo(option)
    return `${C.URL}/${_v}/${C.TS_DATA}/${seriaId}${_queryKey}${_queryPeriod}`;
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
