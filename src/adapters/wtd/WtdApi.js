
const C = {
  URL_H: 'https://api.worldtradingdata.com/api/v1/history',
  URL_INT: 'https://intraday.worldtradingdata.com/api/v1/intraday',
  LIMIT_REMAINING: 'X-DailyLimit-Remaining',
  LM_INTRADAY: 'X-DailyIntradayLimit-Remaining'
};

const _addItemId = (option, value) => {
  option._itemId = value
};

const _crUrlHistory = (option) => {
  const {
    key,
    fromDate,
    toDate,
    value,
    apiKey
  } = option;
  _addItemId(option,  key)
  return `${C.URL_H}?symbol=${value}&date_from=${fromDate}&date_to=${toDate}&sort=oldest&api_token=${apiKey}`;
}

const _crUlrIntraday = (option) => {
  const {
    key,
    value,
    two,
    apiKey
  } = option;
  _addItemId(option, key)
  option.interval = two
  return `${C.URL_INT}?symbol=${value}&interval=${two}&range=2&sort=desc&api_token=${apiKey}&output=json`;
};

const _rCrUrl = {
  DF: _crUrlHistory,
  intraday: _crUlrIntraday
};
const _rCheckResponse = {
  DF: json => json && json.history,
  intraday: json => json && json.intraday
};

const WtdApi = {
  getRequestUrl(option){
    const { dfType } = option
    , _crUrl = _rCrUrl[dfType] || _rCrUrl.DF;
    return _crUrl(option);
  },

  getLimitRemaiming: headers => headers.get(C.LIMIT_REMAINING),

  checkResponse(json, option){
    const { dfType } = option
    , _checkResponse = _rCheckResponse[dfType] || _rCheckResponse.DF
    return !!_checkResponse(json);
  }
}

export default WtdApi
