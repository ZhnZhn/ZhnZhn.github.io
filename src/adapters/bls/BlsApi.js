import fnAdapter from './fnAdapter'

const C = {
  URL: 'https://api.bls.gov/publicAPI/v1/timeseries/data',
  NATIVE_URL: 'https://data.bls.gov/timeseries'
};

const _isArr = Array.isArray
, _assign = Object.assign
, { crTitle } = fnAdapter;

const _addNativeLinkTo = (option) => {
  const { value='' } = option;
  _assign(option, {
    linkItem: {
      caption: 'BSL Data Link',
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

  /*
  crOptionFetch(option){
    const { value='' } = option
    return {
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seriesid: [ value ],
        startyear: "2010",
        endyear: "2018"
      })

    };
  },
  */

  getRequestUrl(option){
    const { value='' } = option;
    _addNativeLinkTo(option)
    _setCaptionTo(option)
    return `${C.URL}/${value}`;
  },
  checkResponse(json){
    const { Results={} } = json || {}
    , { series=[] } = Results;
    return series[0] && _isArr(series[0].data);
  }
}

export default BlsApi
