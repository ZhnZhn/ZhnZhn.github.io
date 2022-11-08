import { isArr } from '../AdapterFn';

const DATA_URL = './data/irena';

const IrenaApi = {
  getRequestUrl(option){
    const {
      items
    } = option
    , metric = items[1].v
    , source = items[2].v
    , geo = items[0].v;
    return `${DATA_URL}/${metric}/${source}/${geo}.json`;
  },

  checkResponse(json){
    const { data } = json || {};
    return isArr(data);
  }
};

export default IrenaApi
