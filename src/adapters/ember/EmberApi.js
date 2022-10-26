import { isArr } from '../AdapterFn';

const URL = './data/ember/annual';
const GENERAL_TOTAL_GEO = 'general-total';

const _isTotalShare = (
  source,
  metric
) => source === 'total' && metric === 'share';

const EmberApi = {
  getRequestUrl(option){
    const {
      items
    } = option
    , metric = items[1].v
    , source = items[2].v
    , geo = _isTotalShare(source, metric)
       ? GENERAL_TOTAL_GEO
       : items[0].v;
    return `${URL}/${metric}/${source}/${geo}.json`;
  },

  checkResponse(json){
    const { data } = json || {};
    return isArr(data);
  }
};

export default EmberApi
