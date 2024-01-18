import {
  getValue,
  isArr,
  crError
} from '../AdapterFn';

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

  checkResponse(json){
    const { data } = json || {};
    if (!isArr(data)) {
      throw crError();
    }
  }
};

export default EnApi
