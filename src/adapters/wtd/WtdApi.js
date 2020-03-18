
const C = {
  URL_H: 'https://api.worldtradingdata.com/api/v1/history',
  URL_INT: 'https://intraday.worldtradingdata.com/api/v1/intraday',
  LIMIT_REMAINING: 'X-DailyLimit-Remaining',
  LM_INTRADAY: 'X-DailyIntradayLimit-Remaining'
};

const _addItemIdTo = (option, value) => {
  option._itemId = value
};
const _addApiKey = (url, apiKey) => `${url}&api_token=${apiKey}`;

const _crUrlHistory = (option) => {
  const {
    fromDate,
    toDate,
    //from dialog
    value,
    //from watch list
    symbol
  } = option
  , _symbol = value || symbol;
  return `${C.URL_H}?symbol=${_symbol}&date_from=${fromDate}&date_to=${toDate}&sort=oldest`;
}

const _crUlrIntraday = (option) => {
  const {
    value,
    two
  } = option;
  option.interval = two
  return `${C.URL_INT}?symbol=${value}&interval=${two}&range=2&sort=desc&output=json`;
};

const _rCrUrl = {
  DF: _crUrlHistory,
  intraday: _crUlrIntraday
};
const _rCheckResponse = {
  DF: json => json && json.history,
  intraday: json => json && json.intraday
};

const _crUrl = option => {
  const { dfType } = option;
  return (_rCrUrl[dfType] || _rCrUrl.DF)(option);
}

const WtdApi = {
  getRequestUrl(option){
    const { key, apiKey } = option;
    _addItemIdTo(option, key)
    return _addApiKey(_crUrl(option), apiKey);
  },

  getLimitRemaiming: headers => headers.get(C.LIMIT_REMAINING),

  checkResponse(json, option){
    const { dfType }  = option
    , _checkResponse = _rCheckResponse[dfType] || _rCheckResponse.DF
    return !!_checkResponse(json);
  }
}

export default WtdApi
