import {
  toUpperCaseFirst
} from '../../utils/strFn';

import {
  assign,
  crGetRoute,
  getValues,
  getValueCaption,
  getCaption,
  safeReplaceIn
} from '../AdapterFn';

import {
  crFunctionQuery,
  fAvApi
} from '../av/AvFn';
import {
  DF_FN_EOD
} from './fnAdapter';

const _crFnSymbolQuery = (
  fnName,
  symbol
) => `${crFunctionQuery(fnName)}&symbol=${symbol}`;

const _getSymbol = (
  option
) => getValues(option)[0];

const _getInterval = intervalValue => {
  const dfFn = intervalValue.split('&')[0]
  , dfT = safeReplaceIn(dfFn, 'TIME_SERIES_', '')
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
    ticket,
    title
  ] = getValueCaption(items[0])
  , [
    intervalValue,
    subtitle
  ] = getValueCaption(items[1])
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
  const [
    ticket,
    interval
  ] = getValues(option)
  , title = `${ticket} (${interval})`;
  assign(option, {
    ticket,
    interval,
    title,
    itemCaption: title
  })
  return `${_crFnSymbolQuery(option.dfFn, ticket)}&interval=${interval}`;
};

const _crIncomeQuery = option => {
  const {
    items
  } = option
  , [
    symbol,
    dfItem,
    dfPeriod
  ] = getValues(option);
  assign(option, {
    itemCaption: safeReplaceIn(
      option.itemCaption,
      getCaption(items[0]),
      symbol
    ),
    dfItem,
    dfPeriod
  })
  return _crFnSymbolQuery(option.dfFn, symbol);
};

const _crEarningQuery = option => {
  const [
    symbol,
    dfPeriod
  ] = getValues(option);
  assign(option, {
    itemCaption: symbol,
    dfPeriod
  })
  return _crFnSymbolQuery(option.dfFn, symbol);
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
  const [
    symbol,
    market
  ] = getValues(option);
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
