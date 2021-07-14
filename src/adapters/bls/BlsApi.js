import fnAdapter from './fnAdapter';

const C = {
  URL: 'https://api.bls.gov/publicAPI',
  TS_DATA: 'timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};

const _isArr = Array.isArray
, _assign = Object.assign
, { crError, crTitle } = fnAdapter;

const _getValue = ({ items=[] }) => items[0].v;

const _addNativeLinkTo = (option) => {
  const value = _getValue(option);
  _assign(option, {
    linkItem: {
      caption: 'BLS Data Link',
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

const _crQuery = ({ apiKey }) => apiKey
  ? `?registrationkey=${apiKey}`
  : ''

const BlsApi = {

  getRequestUrl(option){
    const value = _getValue(option)
    , _query = _crQuery(option)
    , _v = _query ? 'v2' : 'v1'
    _addNativeLinkTo(option)
    _setCaptionTo(option)
    return `${C.URL}/${_v}/${C.TS_DATA}/${value}${_query}`;    
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
