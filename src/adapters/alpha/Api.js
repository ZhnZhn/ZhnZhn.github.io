import isEmpty from '../../utils/isEmpty';
import {
  DF_FN_EOD,
  isInArrStr,
  toUpperCaseFirst,
  crError,
  getValue,
  getCaption,
  getValueCaption
} from './fnAdapter';

const ROOT = 'https://www.alphavantage.co/query'
, ERR_PROP = 'Error Message'
, INFO_PROP = 'Information'
, REQ_ERROR = 'Request Error'
, _assign = Object.assign
, _crFunctionQuery = value => `function=${value}`;

const _crEconomicsQuery = (
  option
) => {
  const {
    items
  } = option
  , [
    value,
    itemCaption
  ] = getValueCaption(items[0]);
  _assign(option, {
    itemCaption
  })
  return _crFunctionQuery(value);
}

const  _isDailyInterval = isInArrStr([
  'daily',
  'weekly'
])
, _isQuarterlyInterval = isInArrStr([
  'quarterly',
  'annual'
]);

const _checkCommoditiesParams = (
  item,
  interval
) => {
  const [
    itemId,
    itemCaption
  ] = getValueCaption(item)
  , [
    intervalId,
    _intervalCaption
  ] = getValueCaption(interval);
  if ((!item.dw && _isDailyInterval(intervalId))
   || (item.dw && _isQuarterlyInterval(intervalId))
  ) {
    throw crError(REQ_ERROR, `Interval ${_intervalCaption} is absent for ${itemCaption}`);
  }
  return [
    itemId,
    itemCaption,
    intervalId
  ];
}

const _crCommoditiesQuery = (
  option
) => {
  const {
    items
  } = option
  , [
    item,
    interval
  ] = items
  , [
    itemId,
    itemCaption,
    intervalId
  ] = _checkCommoditiesParams(
    item,
    interval
  );

  _assign(option, {
    itemCaption
  })
  return `${_crFunctionQuery(itemId)}&interval=${intervalId}`;
}

const _crFnSymbolQuery = (
  fnName,
  symbol
) => `${_crFunctionQuery(fnName)}&symbol=${symbol}`;

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
  const {
    items
  } = option
  , [
    _stockItem,
    _intervalItem
  ] = items
  , [
    ticket,
    title
  ] = getValueCaption(_stockItem)
  , [
    intervalValue,
    subtitle
  ] = getValueCaption(_intervalItem)
  , [
    dfT,
    interval
  ] = _getInterval(intervalValue);

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
  const {
    items,
    dfFn
  } = option
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

const _crTopGlQuery = () => _crFunctionQuery('TOP_GAINERS_LOSERS')

const _crCrQuery = (
  option
) => {
  const { items } = option
  , symbol = getValue(items[0])
  , market = getValue(items[1]);
  _assign(option, {
    itemCaption: `${symbol}/${market}`
  })
  return `${_crFunctionQuery('DIGITAL_CURRENCY_DAILY')}&symbol=${symbol}&market=${market}`;
};

const _routerQuery = {
  DF: _crDfQuery,

  CR: _crCrQuery,

  ECONOMICS: _crEconomicsQuery,
  CM: _crCommoditiesQuery,
  [DF_FN_EOD]: _crEodQuery,
  GL: _crTopGlQuery,

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
  }
}

export default AlphaApi
