
const C = {
  ROOT_URL: 'https://data.ssb.no/api/v0/dataset'
};

const DatasetApi = {
  getRequestUrl( option ){
    const { dfId } = option;        
    return `${C.ROOT_URL}/${dfId}.json?lang=en`;
  },
  checkResponse(){
    return true;
  }
}

export default DatasetApi
