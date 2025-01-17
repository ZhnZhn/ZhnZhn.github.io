import {
  setItemCaptionTo,
  crError
} from '../AdapterFn';

import {
  CRYPTOCOMPARE_COM,
  assign,
  getValue
} from './fnAdapter';

const URL = `https://min-api.${CRYPTOCOMPARE_COM}`
//, HD: 'data/histoday'
, QUERY_TAIL = 'extraParams=webapperc'
, DF_ID = 'BTC'
, DF_E = 'CCCAGG'
, DF_INTERVAL = 'histoday';

const _fGetParam = (index, dfValue) => items => getValue(items[index], { dfValue })
, _getFsym = _fGetParam(0, DF_ID)
, _getE = _fGetParam(1, DF_E)
, _getInterval = _fGetParam(2, DF_INTERVAL)

const _hdUrl = (option) => {
  const { items=[] } = option
  , value = _getFsym(items)
  , exchange = _getE(items)
  , interval = _getInterval(items)
  , tsym = exchange === 'Binance' ? 'USDT' : 'USD';
  assign(option, { value, exchange, tsym })
  setItemCaptionTo(option, `${value}/${tsym}`)
  return `${URL}/data/${interval}?fsym=${value}&e=${exchange}&tsym=${tsym}&limit=600&${QUERY_TAIL}`;
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
    if (!json || json.Response === 'Error') {
      throw crError('', json && json.Message);
    }
  }
};

export default CrcApi
