import fnAdapter from './fnAdapter'

const { getValue } = fnAdapter;

const C = {
  URL: 'https://min-api.cryptocompare.com',
  //HD: 'data/histoday',
  QUERY_TAIL: 'extraParams=webapperc',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty',
  DF_ID: 'BTC',
  DF_E: 'CCCAGG',
  DF_INTERVAL: 'histoday'
};

const _assign = Object.assign
, _fGetParam = (index, dfValue) => items => getValue(items[index], { dfValue })
, _getFsym = _fGetParam(0, C.DF_ID)
, _getE = _fGetParam(1, C.DF_E)
, _getInterval = _fGetParam(2, C.DF_INTERVAL)

const _hdUrl = (option) => {
  const { items=[] } = option
  , value = _getFsym(items)
  , exchange = _getE(items)
  , interval = _getInterval(items)
  , tsym = exchange === 'Binance' ? 'USDT' : 'USD';
  _assign(option, { value, exchange, tsym })
  return `${C.URL}/data/${interval}?fsym=${value}&e=${exchange}&tsym=${tsym}&limit=600&${C.QUERY_TAIL}`;
};


const _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl
};

const CrcApi = {
  getRequestUrl(option){
    const { dfSubId } = option
    , _crUrl = _rUrl[dfSubId] || _rUrl.DF;
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
