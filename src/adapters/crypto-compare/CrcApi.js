const C = {
  URL: 'https://min-api.cryptocompare.com/',
  HD: 'data/histoday',
  URL_CI: 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty'
};

const _hdUrl = (option) => {
  const { value='' } = option;
  return `${C.URL}${C.HD}?fsym=${value}&tsym=USD&limit=600`;
}

const _ciUrl = (option) => {
  const { proxy, value='' } = option;
  return `${proxy}${C.URL_CI}?id=${value}`;
};

const _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl,
  CI: _ciUrl
};

const CrcApi = {
  getRequestUrl(option){
    const { dfSubLoadId } = option
        , _crUrl = _rUrl[dfSubLoadId] || _rUrl.DF;
    return _crUrl(option);
  },
  checkResponse(json){
    if ( !(json && json.Response !== 'Error') ){
      const message = json
               ? json.Message || ''
               : C.RESPONSE_EMPTY
      throw {
        errCaption: C.REQUEST_ERROR,
        message: message
      };
    }
    return true;
  }
};

export default CrcApi
