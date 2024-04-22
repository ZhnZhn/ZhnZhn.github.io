import {
  isArr,
  crError,
  getValue
} from '../AdapterFn';

const API_URL = 'https://api.wto.org/timeseries/v1/data';

const WtApi = {
  getRequestUrl(option){
    const {
      proxy,
      items,
      dfInd,
      apiKey
    } = option
    , _r = getValue(items[0])
    , _pc = getValue(items[1]) || "TO";

    return `${proxy}${API_URL}?i=${dfInd}&r=${_r}&p=000&pc=${_pc}&ps=2005-2024&subscription-key=${apiKey}`;
  },

  checkResponse(json, option){
    const { Dataset } = json || {};
    if (!isArr(Dataset)) {
      throw crError();
    }
  }
};

export default WtApi
