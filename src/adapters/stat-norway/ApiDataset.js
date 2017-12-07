
const C = {
  ROOT_URL: 'http://data.ssb.no/api/v0/dataset'
};

const DatasetApi = {
  getRequestUrl( option ){
    const { proxy, metric, dfId } = option
        , id = dfId ? dfId : metric;
    return `${proxy}${C.ROOT_URL}/${id}.json?lang=en`;
  },
  checkResponse(){
    return true;
  }
}

export default DatasetApi
