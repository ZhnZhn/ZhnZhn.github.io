import isEmpty from '../../utils/isEmpty'
import fnAdapter from './fnAdapter'

const {
  getValue,
  getCaption,
  joinBy
} = fnAdapter;

const C = {
  ROOT: 'https://www.alphavantage.co/query',

  DF_TICKET: 'MSFT',
  DF_SIZE: 'compact',
  DF_PERIOD: '50',

  ERR_PROP: 'Error Message',
  REQ_ERROR: 'Request Error',
  RES_EMPTY: 'Response Empty',
  MSG_EMPTY: 'Empty response from data provider'
};

const _assign = Object.assign
, _isArr = Array.isArray;

const _crError = (errCaption, message) => ({
  errCaption, message
});

const _getOneTwo = ({ value, outputsize, items }) => {
  return _isArr(items)
    ? [getValue(items[0]), getValue(items[1])]
    //Stocks by Sectors case
    : [value || C.DF_TICKET, outputsize || C.DF_SIZE];
};

const _crSectorQuery = () => {};
const _crIntradayQuery = option => {
  const [ticket, interval] = _getOneTwo(option)
  , title = `${ticket} (${interval})`;
  _assign(option, {
    ticket, interval,
    title, itemCaption: title
  })
  return `interval=${interval}&symbol=${ticket}`;
};
const _crDailyQuery = option => {
  const [ticket, outputsize] = _getOneTwo(option)
  , title = `${ticket} (Daily)`;
  _assign(option, {
     ticket, outputsize, interval: "Daily",
     title, itemCaption: title
   })
  return `outputsize=${outputsize}&symbol=${ticket}`;
};
const _crIncomeQuery = option => {
  const { items, itemCaption } = option
  , _symbol = getValue(items[0]);
  _assign(option, {
    itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
    dfItem: getValue(items[1]),
    dfPeriod: getValue(items[2])
  })
  return `symbol=${_symbol}`;
};
const _crEarningQuery = option => {
  const { items } = option
  , _symbol = getValue(items[0]);
  _assign(option, {
    itemCaption: _symbol,
    dfPeriod: getValue(items[1])
  })
  return `symbol=${_symbol}`;
};
const _crDfQuery = ({
  ticket=C.DF_TICKET,
  period=C.DF_PERIOD
}) => `symbol=${ticket}&interval=daily&time_period=${period}&series_type=close`;

const _routerQuery = {
  DF: _crDfQuery,
  SECTOR: _crSectorQuery,
  TIME_SERIES_INTRADAY: _crIntradayQuery,

  TIME_SERIES_DAILY: _crDailyQuery,
  TIME_SERIES_DAILY_ADJUSTED: _crDailyQuery,

  INCOME_STATEMENT: _crIncomeQuery,
  BALANCE_SHEET: _crIncomeQuery,
  CASH_FLOW: _crIncomeQuery,

  EARNINGS: _crEarningQuery
};

const AlphaApi = {
  getRequestUrl(option) {
    const { indicator='SMA', dfFn=indicator, apiKey } = option
    , _crQuery = _routerQuery[dfFn] || _routerQuery.DF
    , _queryParam = joinBy('&',
        `function=${dfFn}`,
        _crQuery(option),
        `apikey=${apiKey}`
    );
    return `${C.ROOT}?${_queryParam}`;
  },

  checkResponse(json){
    if (isEmpty(json)) {
      throw _crError(C.RES_EMPTY, C.MSG_EMPTY);
    }
    if (json[C.ERR_PROP]) {
      throw _crError(C.REQ_ERROR, json[C.ERR_PROP]);
    }
    return true;
  }
}

export default AlphaApi
