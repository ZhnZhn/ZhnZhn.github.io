import {
  isArr,
  assign,
  crError,
  getValue
} from '../AdapterFn';

const API_URL = "https://api.coincap.io/v2";

const _setTitleTo = (
  option,
  title
) => assign(option, {
  title
});

const CoinCapApi = {
  getRequestUrl(option){
    const { items } = option
    , offset = getValue(items[0])
    , limit = getValue(items[1]);

    _setTitleTo(option,
      `By USD Market Cap Page: ${offset} (${limit})`
     )
    return `${API_URL}/assets?limit=${limit}&offset=${(parseInt(offset)-1)*(parseInt(limit))}`;
  },

  checkResponse(json){
    if (!isArr((json || {}).data)) {
      throw crError();
    }
  }
};

export default CoinCapApi
