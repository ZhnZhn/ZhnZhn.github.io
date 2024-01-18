import { getValue } from '../AdapterFn';
import { checkResponseData } from '../ApiFn';

const DATA_URL = './data/environment';

const _crLineUrl = (
  option
) => {
  const { items } = option
  , id = getValue(items[0]);
  return `${DATA_URL}/${id}.json`;
}

const EnApi = {
  getRequestUrl(option){
    return _crLineUrl(option);
  },
  checkResponse: checkResponseData
};

export default EnApi
