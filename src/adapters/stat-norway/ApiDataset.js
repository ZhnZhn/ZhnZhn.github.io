
const C = {
  ROOT_URL: 'https://data.ssb.no/api/v0/dataset'
};

const DatasetApi = {
  getRequestUrl( option ){
    const { metric, dfId } = option
        , id = dfId ? dfId : metric;
    return `${C.ROOT_URL}/${id}.json?lang=en`;
  },
  checkResponse(){
    return true;
  }
}

export default DatasetApi
