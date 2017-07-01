
const C = {
  ROOT: 'https://www.alphavantage.co/query'
}

const AlphaApi = {
  getRequestUrl(option) {
    const { indicator='SMA', ticket='MSFT', period='50', apiKey='demo' } = option;    
    return `${C.ROOT}?function=${indicator}&symbol=${ticket}&interval=daily&time_period=${period}&series_type=close&apikey=${apiKey}`;
  },

  checkResponse(json){
    return true;
  }
}

export default AlphaApi
