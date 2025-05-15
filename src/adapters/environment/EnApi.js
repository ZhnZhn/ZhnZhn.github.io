import {
  getValues,
  fCheckResponse
} from '../AdapterFn';

const DATA_URL = './data/environment';

const _crLineUrl = (
  option
) => `${DATA_URL}/${getValues(option)[0]}.json`;

const EnApi = {
  getRequestUrl(option){
    return _crLineUrl(option);
  },
  checkResponse: fCheckResponse()
};

export default EnApi
