import isEmpty from '../../utils/isEmpty';
import {
  DF_FN_EOD,
  toUpperCaseFirst,
  crError,
  getValue,
  getCaption
} from './fnAdapter';

const ROOT = 'https://www.alphavantage.co/query'
, ERR_PROP = 'Error Message'
, INFO_PROP = 'Information'
, REQ_ERROR = 'Request Error'
, _assign = Object.assign;

const _crEconomicsQuery = (
  option
) => {
  const { items } = option
  , _item = items[0]
  , itemCaption = getCaption(_item)
  , value = getValue(_item)
  _assign(option, {
    itemCaption
  })
  return `function=${value}`;
}

const _crFnSymbolQuery = (
  fnName,
  symbol
) => `function=${fnName}&symbol=${symbol}`;

const _getInterval = intervalValue => {
  const dfFn = intervalValue.split('&')[0]
  , dfT = (dfFn || '').replace('TIME_SERIES_', '')
  , interval = dfT
     .split('_')
     .map(token => toUpperCaseFirst(token.toLowerCase()))
     .join(' ');
  return [dfT, interval];
}

const _crEodQuery = option => {
  const { items } = option
  , [
    _stockItem,
    _intervalItem
  ] = items
  , ticket = getValue(_stockItem)
  , title = getCaption(_stockItem)
  , intervalValue = getValue(_intervalItem)
  , subtitle = getCaption(_intervalItem)
  , [dfT, interval] = _getInterval(intervalValue);

  _assign(option, {
    itemCaption: ticket,
    ticket,
    title,
    subtitle,
    dfT,
    interval
  })
  return _crFnSymbolQuery(intervalValue, ticket);
}

const _crSectorQuery = () => {};

const _crIntradayQuery = option => {
  const {
    dfFn,
    items
  } = option
  , ticket = getValue(items[0])
  , interval = getValue(items[1])
  , title = `${ticket} (${interval})`;
  _assign(option, {
    ticket,
    interval,
    title,
    itemCaption: title
  })
  return `${_crFnSymbolQuery(dfFn, ticket)}&interval=${interval}`;
};

const _crIncomeQuery = option => {
  const {
    items,
    itemCaption,
    dfFn
  } = option
  , _symbol = getValue(items[0]);
  _assign(option, {
    itemCaption: itemCaption.replace(getCaption(items[0]), _symbol),
    dfItem: getValue(items[1]),
    dfPeriod: getValue(items[2])
  })
  return _crFnSymbolQuery(dfFn, _symbol);
};
const _crEarningQuery = option => {
  const { items, dfFn } = option
  , _symbol = getValue(items[0]);
  _assign(option, {
    itemCaption: _symbol,
    dfPeriod: getValue(items[1])
  })
  return _crFnSymbolQuery(dfFn, _symbol);
};
const _crDfQuery = ({
  ticket='MSFT',
  period=50,
  indicator='SMA'
}) => `${_crFnSymbolQuery(indicator, ticket)}&interval=daily&time_period=${period}&series_type=close`;

const _routerQuery = {
  DF: _crDfQuery,

  ECONOMICS: _crEconomicsQuery,
  [DF_FN_EOD]: _crEodQuery,

  SECTOR: _crSectorQuery,
  TIME_SERIES_INTRADAY: _crIntradayQuery,

  INCOME_STATEMENT: _crIncomeQuery,
  BALANCE_SHEET: _crIncomeQuery,
  CASH_FLOW: _crIncomeQuery,

  EARNINGS: _crEarningQuery
};

const AlphaApi = {
  getRequestUrl(option) {
    const {
      dfFn,
      apiKey
    } = option
    , _crQuery = (dfFn && _routerQuery[dfFn])
        || _routerQuery.DF
    , _queryParam = _crQuery(option);

    option.apiKey = void 0
    return `${ROOT}?${_queryParam}&apikey=${apiKey}`;
  },

  checkResponse(json){
    if (isEmpty(json)) {
      throw crError();
    }
    const _msg = json[ERR_PROP] || json[INFO_PROP];
    if (_msg) {
      throw crError(REQ_ERROR, _msg);
    }
    return true;
  }
}

export default AlphaApi
