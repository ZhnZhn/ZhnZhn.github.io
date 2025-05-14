import {
  crFunctionQuery,
  fAvApi
} from '../av/AvFn';
import {
  DF_FN_EOD,
  assign,
  toUpperCaseFirst,
  crGetRoute,
  getValue,
  getCaption,
  getValueCaption
} from './fnAdapter';

const _crFnSymbolQuery = (
  fnName,
  symbol
) => `${crFunctionQuery(fnName)}&symbol=${symbol}`;

const _getSymbol = (
  option
) => getValue(option.items[0]);

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

  assign(option, {
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
  assign(option, {
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
  assign(option, {
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
  assign(option, {
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

const _crInsiderTransactionsQuery = (
  option
) => _crFnSymbolQuery(
  'INSIDER_TRANSACTIONS',
  _getSymbol(option)
);

const _crTopGlQuery = () => crFunctionQuery('TOP_GAINERS_LOSERS')

const _crCrQuery = (
  option
) => {
  const { items } = option
  , symbol = getValue(items[0])
  , market = getValue(items[1]);
  assign(option, {
    itemCaption: `${symbol}/${market}`
  })
  return `${_crFnSymbolQuery('DIGITAL_CURRENCY_DAILY', symbol)}&market=${market}`;  
};

const _fCrQuery1 = (
  fnName
) => option => _crFnSymbolQuery(
  fnName,
  _getSymbol(option)
);

const _getCrQuery = crGetRoute({
  CR: _crCrQuery,

  [DF_FN_EOD]: _crEodQuery,
  INSTR: _crInsiderTransactionsQuery,
  GL: _crTopGlQuery,

  TIME_SERIES_INTRADAY: _crIntradayQuery,

  INCOME_STATEMENT: _crIncomeQuery,
  BALANCE_SHEET: _crIncomeQuery,
  CASH_FLOW: _crIncomeQuery,

  EARNINGS: _crEarningQuery,

  ETF_PROFILE: _fCrQuery1("ETF_PROFILE"),
  OVERVIEW: _fCrQuery1("OVERVIEW")
}, _crDfQuery);

const AlphaApi = fAvApi(
  option => _getCrQuery(option.dfFn)
);

export default AlphaApi
