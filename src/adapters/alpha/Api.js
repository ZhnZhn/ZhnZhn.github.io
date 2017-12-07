
const C = {
  ROOT: 'https://www.alphavantage.co/query',
  REQUEST_ERROR: 'Request Error'
}

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
      default:
        return `${C.ROOT}?function=${indicator}&symbol=${ticket}&interval=daily&time_period=${period}&series_type=close&apikey=${apiKey}`;
    }
  },

  checkResponse(json){
    if (!json['Error Message']) return true;
    else {
      throw {
        errCaption : C.REQUEST_ERROR,
        message : json['Error Message']
      };
    }
  }
}

export default AlphaApi
