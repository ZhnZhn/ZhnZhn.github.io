import { crError } from '../AdapterFn';

const API_URL = "https://data.ssb.no/api/v0/dataset";
const _crErr = crError.bind(null, '');

const DatasetApi = {
  getRequestUrl( option ){
    const { dfId } = option;
    return `${API_URL}/${dfId}.json?lang=en`;
  },

  checkResponse(json){
    const { error } = json || {};
    if (error) {
      throw _crErr(error);
    }
  }
};

export default DatasetApi
