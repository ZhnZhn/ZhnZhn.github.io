import {
  getValues,
  fCheckResponse
} from '../AdapterFn';

const DATA_URL = './data/imf/weo-commodity-prices';

const _crLineUrl = (
  option
) => `${DATA_URL}/${getValues(option)[0]}.json`;

const ImfTsApi = {
  getRequestUrl(option){
    return _crLineUrl(option);
  },
  checkResponse: fCheckResponse()
};

export default ImfTsApi
