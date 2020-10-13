import fnAdapter from './fnAdapter'

const { getValue } = fnAdapter;

const C = {
  URL: 'https://min-api.cryptocompare.com/',
  HD: 'data/histoday',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty',
  DF_ID: 'BTC'
};

const _getValue = (items=[]) =>
  getValue(items[0], { dfValue: C.DF_ID });

const _hdUrl = (option) => {
  const value = _getValue(option.items);
  option.value = value
  return `${C.URL}${C.HD}?fsym=${value}&tsym=USD&limit=600`;
}


const _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl
};

const CrcApi = {
  getRequestUrl(option){
    const { dfSubLoadId } = option
    , _crUrl = _rUrl[dfSubLoadId] || _rUrl.DF;
    return _crUrl(option);
  },
  checkResponse(json){
    if ( !(json && json.Response !== 'Error') ){
      throw {
        errCaption: C.REQUEST_ERROR,
        message: json
            ? json.Message || ''
            : C.RESPONSE_EMPTY
      };
    }
    return true;
  }
};

export default CrcApi
