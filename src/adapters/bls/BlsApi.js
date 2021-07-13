import fnAdapter from './fnAdapter'

const C = {
  URL: 'https://api.bls.gov/publicAPI/v2/timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};

const _isArr = Array.isArray
, _assign = Object.assign
, { crTitle } = fnAdapter;

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

const BlsApi = {

  getRequestUrl(option){
    const value = _getValue(option);
    _addNativeLinkTo(option)
    _setCaptionTo(option)
    return `${C.URL}/${value}`;
  },
  checkResponse(json){
    const { Results } = json || {}
    , { series=[] } = Results || {};
    return series[0] && _isArr(series[0].data);
  }
}

export default BlsApi
