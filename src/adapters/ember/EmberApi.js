
const URL = './data/ember/annual';

const _isArr = Array.isArray;

const EmberApi = {
  getRequestUrl(option){
    const {
      items
    } = option
    , geo = items[0].v
    , source = items[1].v
    , metric = items[2].v;
    return `${URL}/${metric}/${source}/${geo}.json`;
  },

  checkResponse(json){
    const { data } = json || {};
    return _isArr(data);
  }
};

export default EmberApi
