import { crErrorByMessage } from '../AdapterFn';

const API_URL = "https://data.ssb.no/api/v0/dataset";

const DatasetApi = {
  getRequestUrl( option ){
    const { dfId } = option;
    return `${API_URL}/${dfId}.json?lang=en`;
  },

  checkResponse(json){
    const { error } = json || {};
    if (error) {
      throw crErrorByMessage(error);
    }
  }
};

export default DatasetApi
