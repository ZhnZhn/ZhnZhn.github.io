import { isArr } from '../AdapterFn';

const DATA_URL = './data/ei';

const _crApiUrl = (
  option
) => {
  const { items } = option
  , metric = items[1].v
  return `${DATA_URL}/${metric}`;
}

const _crLineUrl = (
  option
) => {
  const { items } = option
  , geo = items[0].v;
  return `${_crApiUrl(option)}/${geo}.json`;
};

const IrenaApi = {
  getRequestUrl(option){
    return _crLineUrl(option);
  },

  checkResponse(json){
    const { data } = json || {};
    return isArr(data);
  }
};

export default IrenaApi
