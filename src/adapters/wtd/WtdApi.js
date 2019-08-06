
const C = {
  URL: 'https://api.worldtradingdata.com/api/v1/history',
  LIMIT_REMAINING: 'X-DailyLimit-Remaining'
};

const _addItemId = (option, value) => {
  option._itemId = value
};

const WdtApi = {
  getRequestUrl(option){
    const {
      fromDate,
      toDate,
      value,
      apiKey
    } = option;
    _addItemId(option, value)
    return `${C.URL}?symbol=${value}&date_from=${fromDate}&date_to=${toDate}&sort=oldest&api_token=${apiKey}`;
  },

  getLimitRemaiming: headers => headers.get(C.LIMIT_REMAINING),

  checkResponse(json, option){
    if (json && json.history) {
      return true;
    }
    return false;
  }
}

export default WdtApi
