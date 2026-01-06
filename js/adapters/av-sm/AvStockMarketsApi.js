"use strict";

exports.__esModule = true;
exports.default = void 0;
var _itemFn = require("../../utils/itemFn");
var _strFn = require("../../utils/strFn");
var _crRouter = require("../../utils/crRouter");
var _AdapterFn = require("../AdapterFn");
var _AvFn = require("../av/AvFn");
var _fnAdapter = require("./fnAdapter");
const _crFnSymbolQuery = (fnName, symbol) => `${(0, _AvFn.crFunctionQuery)(fnName)}&symbol=${symbol}`;
const _getSymbol = option => (0, _AdapterFn.getValues)(option)[0];
const _getInterval = intervalValue => {
  const dfFn = intervalValue.split('&')[0],
    dfT = (0, _strFn.safeReplaceIn)(dfFn, 'TIME_SERIES_', ''),
    interval = dfT.split('_').map(token => (0, _strFn.toUpperCaseFirst)(token.toLowerCase())).join(' ');
  return [dfT, interval];
};
const _crEodQuery = option => {
  const {
      items
    } = option,
    [ticket, title] = (0, _itemFn.getValueAndCaption)(items[0]),
    [intervalValue, subtitle] = (0, _itemFn.getValueAndCaption)(items[1]),
    [dfT, interval] = _getInterval(intervalValue);
  (0, _AdapterFn.assign)(option, {
    itemCaption: ticket,
    ticket,
    title,
    subtitle,
    dfT,
    interval
  });
  return _crFnSymbolQuery(intervalValue, ticket);
};
const _crIntradayQuery = option => {
  const [ticket, interval] = (0, _AdapterFn.getValues)(option),
    title = `${ticket} (${interval})`;
  (0, _AdapterFn.assign)(option, {
    ticket,
    interval,
    title,
    itemCaption: title
  });
  return `${_crFnSymbolQuery(option.dfFn, ticket)}&interval=${interval}`;
};
const _crIncomeQuery = option => {
  const {
      items
    } = option,
    [symbol, dfItem, dfPeriod] = (0, _AdapterFn.getValues)(option);
  (0, _AdapterFn.assign)(option, {
    itemCaption: (0, _strFn.safeReplaceIn)(option.itemCaption, (0, _itemFn.getCaption)(items[0]), symbol),
    dfItem,
    dfPeriod
  });
  return _crFnSymbolQuery(option.dfFn, symbol);
};
const _crEarningQuery = option => {
  const [symbol, dfPeriod] = (0, _AdapterFn.getValues)(option);
  (0, _AdapterFn.assign)(option, {
    itemCaption: symbol,
    dfPeriod
  });
  return _crFnSymbolQuery(option.dfFn, symbol);
};
const _crDfQuery = _ref => {
  let {
    ticket = 'MSFT',
    period = 50,
    indicator = 'SMA'
  } = _ref;
  return `${_crFnSymbolQuery(indicator, ticket)}&interval=daily&time_period=${period}&series_type=close`;
};
const _crInsiderTransactionsQuery = option => _crFnSymbolQuery('INSIDER_TRANSACTIONS', _getSymbol(option));
const _crTopGlQuery = () => (0, _AvFn.crFunctionQuery)('TOP_GAINERS_LOSERS');
const _crCrQuery = option => {
  const [symbol, market] = (0, _AdapterFn.getValues)(option);
  (0, _AdapterFn.assign)(option, {
    itemCaption: `${symbol}/${market}`
  });
  return `${_crFnSymbolQuery('DIGITAL_CURRENCY_DAILY', symbol)}&market=${market}`;
};
const _fCrQuery1 = fnName => option => _crFnSymbolQuery(fnName, _getSymbol(option));
const _getCrQuery = (0, _crRouter.crGetRoute)({
  CR: _crCrQuery,
  [_fnAdapter.DF_FN_EOD]: _crEodQuery,
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
const AlphaApi = (0, _AvFn.fAvApi)(option => _getCrQuery(option.dfFn));
var _default = exports.default = AlphaApi;
//# sourceMappingURL=AvStockMarketsApi.js.map