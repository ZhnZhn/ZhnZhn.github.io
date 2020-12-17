
import isEmpty from '../../utils/isEmpty'
import fnAdapter from './fnAdapter'

const {
  getValue,
  getCaption
} = fnAdapter

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

const AlphaApi = {
  getRequestUrl(option) {
    const { indicator='SMA', ticket='MSFT', period='50', apiKey, dfFn } = option
    , _fn = dfFn || indicator;
    switch(_fn){
      case 'SECTOR':
        return `${C.ROOT}?function=${_fn}&apikey=${apiKey}`;
      case 'TIME_SERIES_INTRADAY':{
        const { interval } = option;
        return `${C.ROOT}?function=${_fn}&interval=${interval}&symbol=${ticket}&apikey=${apiKey}`;
      }
      case 'TIME_SERIES_DAILY': {
        const { outputsize='compact' } = option;
        return `${C.ROOT}?function=${_fn}&outputsize=${outputsize}&symbol=${ticket}&apikey=${apiKey}`;
      }
      case 'TIME_SERIES_DAILY_ADJUSTED': {
        const { outputsize } = option;
        return `${C.ROOT}?function=${_fn}&outputsize=${outputsize}&symbol=${ticket}&apikey=${apiKey}`;
      }
      case 'INCOME_STATEMENT': case 'BALANCE_SHEET': case 'CASH_FLOW': {
        const { items, itemCaption } = option
        , _symbol = getValue(items[0]);
        _assign(option, {
          itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
          dfItem: getValue(items[1]),
          dfPeriod: getValue(items[2])
        })
        return `${C.ROOT}?function=${_fn}&symbol=${_symbol}&apikey=${apiKey}`;
      }
      case 'EARNINGS': {
        const { items } = option
        , _symbol = getValue(items[0]);
        _assign(option, {
          itemCaption: _symbol,
          dfPeriod: getValue(items[1])
        })
        return `${C.ROOT}?function=${_fn}&symbol=${_symbol}&apikey=${apiKey}`;
      }
      default:
        return `${C.ROOT}?function=${indicator}&symbol=${ticket}&interval=daily&time_period=${period}&series_type=close&apikey=${apiKey}`;
    }
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
