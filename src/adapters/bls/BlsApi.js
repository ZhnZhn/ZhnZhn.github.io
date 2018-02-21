const C = {
  URL: 'https://api.bls.gov/publicAPI/v1/timeseries/data'
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
    const {
           proxy='',
           value=''
         } = option
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
