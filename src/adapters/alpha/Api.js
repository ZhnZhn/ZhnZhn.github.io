import isEmpty from '../../utils/isEmpty'
import fnAdapter from './fnAdapter'

const {
  getValue,
  getCaption,
  joinBy
} = fnAdapter;

const C = {
  ROOT: 'https://www.alphavantage.co/query',

  ERR_PROP: 'Error Message',
  REQ_ERROR: 'Request Error',
  RES_EMPTY: 'Response Empty',
  MSG_EMPTY: 'Empty response from data provider'
};

const _assign = Object.assign

const _crError = (errCaption, message) => ({
  errCaption, message
});

const _getOneTwo = ({ items=[] }) => [
  getValue(items[0]),
  getValue(items[1])
];

const _crQuery = (dfFn, option) => {
  const {
    ticket='MSFT',
    period='50'
  } = option;
  switch(dfFn){
    case 'SECTOR':
      return '';
    case 'TIME_SERIES_INTRADAY':{
      const [ticket, interval] = _getOneTwo(option)
      , title = `${ticket} (${interval})`;
      _assign(option, {
        ticket, interval,
        title, itemCaption: title
      })
      return `interval=${interval}&symbol=${ticket}`;
    }
    case 'TIME_SERIES_DAILY':
    case 'TIME_SERIES_DAILY_ADJUSTED': {
      const [ticket, outputsize] = _getOneTwo(option)
      , title = `${ticket} (Daily)`;
      _assign(option, {
         ticket, outputsize, interval: "Daily",
         title, itemCaption: title
       })
      return `outputsize=${outputsize}&symbol=${ticket}`;
    }
    case 'INCOME_STATEMENT':
    case 'BALANCE_SHEET':
    case 'CASH_FLOW': {
      const { items, itemCaption } = option
      , _symbol = getValue(items[0]);
      _assign(option, {
        itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
        dfItem: getValue(items[1]),
        dfPeriod: getValue(items[2])
      })
      return `symbol=${_symbol}`;
    }
    case 'EARNINGS': {
      const { items } = option
      , _symbol = getValue(items[0]);
      _assign(option, {
        itemCaption: _symbol,
        dfPeriod: getValue(items[1])
      })
      return `symbol=${_symbol}`;
    }
    default:
      return `symbol=${ticket}&interval=daily&time_period=${period}&series_type=close`;
  }
};

const AlphaApi = {
  getRequestUrl(option) {
    const { indicator='SMA', dfFn=indicator, apiKey } = option    
    , _queryParam = joinBy('&',
        `function=${dfFn}`,
        _crQuery(dfFn, option),
        `apikey=${apiKey}`
    );
    return `${C.ROOT}?${_queryParam}`;
  },

  checkResponse(json){
    if (isEmpty(json)) {
      throw _crError(C.RES_EMPTY, C.MSG_EMPTY);
    }
    if (!json[C.ERR_PROP]) {
      return true;
    } else {
      throw _crError( C.REQ_ERROR, json[C.ERR_PROP]);
    }
  }
}

export default AlphaApi
