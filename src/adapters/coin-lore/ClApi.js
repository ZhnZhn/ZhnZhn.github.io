const C = {
  URL: 'https://api.coinlore.net/api'
};

const _isArr = Array.isArray;

const ClApi = {
  getRequestUrl(option){
    const { items=[] } = option
    , { v:id } = items[0];
    return `${C.URL}/exchange/?id=${id}`;
  },
  checkResponse(json, option){
    const { pairs } = json  || {};
    if (_isArr(pairs)) {
      return true;
    }
    throw {
      errCaption: "Response Empty",
    };
  }

};

export default ClApi
