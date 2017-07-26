
const C = {
  ROOT: 'https://www.alphavantage.co/query'
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
    /*
    if (indicator === 'SECTOR') {
      return `${C.ROOT}?function=${indicator}&apikey=${apiKey}`;
    } else if (indicator === 'TIME_SERIES_INTRADAY') {
      const { interval } = option;
      return `${C.ROOT}?function=${indicator}&interval=${interval}&symbol=${ticket}&apikey=${apiKey}`;
    }

    return `${C.ROOT}?function=${indicator}&symbol=${ticket}&interval=daily&time_period=${period}&series_type=close&apikey=${apiKey}`;
    */
  },

  checkResponse(json){
    return true;
  }
}

export default AlphaApi
