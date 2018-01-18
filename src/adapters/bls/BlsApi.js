const C = {
  URL: 'https://api.bls.gov/publicAPI/v1/timeseries/data'
}

const BlsApi = {
  getRequestUrl(option){
    const { proxy='', value='' } = option
    return `${proxy}${C.URL}/${value}`;
  },
  checkResponse(json){
    const { Results={} } = json || {}
        , { series=[] } = Results;
    return series[0]
      && Array.isArray(series[0].data);
  }
}

export default BlsApi
