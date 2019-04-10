
import isEmpty from '../../utils/isEmpty'

const C = {
  ROOT: 'https://www.alphavantage.co/query',

  ERR_PROP: 'Error Message',
  REQ_ERROR: 'Request Error',
  RES_EMPTY: 'Response Empty',
  MSG_EMPTY: 'Empty response from data provider'
};

const _crError = (errCaption, message) => ({
  errCaption, message
});

const AlphaApi = {
  getRequestUrl(option) {
    const { indicator='SMA', ticket='MSFT', period='50', apiKey='demo' } = option;
    switch(indicator){
      case 'SECTOR':
        return `${C.ROOT}?function=${indicator}&apikey=${apiKey}`;
      case 'TIME_SERIES_INTRADAY':{
        const { interval } = option;
        return `${C.ROOT}?function=${indicator}&interval=${interval}&symbol=${ticket}&apikey=${apiKey}`;
      }
      case 'TIME_SERIES_DAILY': {
        const { outputsize } = option;
        return `${C.ROOT}?function=${indicator}&outputsize=${outputsize}&symbol=${ticket}&apikey=${apiKey}`;
      }
      case 'TIME_SERIES_DAILY_ADJUSTED': {
        const { outputsize } = option;
        return `${C.ROOT}?function=${indicator}&outputsize=${outputsize}&symbol=${ticket}&apikey=${apiKey}`;
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
