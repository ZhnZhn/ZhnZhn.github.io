import {
  isArr,
  crError
} from '../AdapterFn';

const API_URL = 'https://api.coinlore.net/api';

const ClApi = {
  getRequestUrl(option){
    const { items=[] } = option
    , { v:id } = items[0];
    return `${API_URL}/exchange/?id=${id}`;
  },

  checkResponse(json, option){
    const { pairs } = json  || {};
    if (!isArr(pairs)) {
      throw crError()
    }
  }
};

export default ClApi
