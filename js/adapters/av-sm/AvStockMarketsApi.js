"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AvFn = require("../av/AvFn");
var _fnAdapter = require("./fnAdapter");
const _crFnSymbolQuery = (fnName, symbol) => `${(0, _AvFn.crFunctionQuery)(fnName)}&symbol=${symbol}`;
const _getInterval = intervalValue => {
  const dfFn = intervalValue.split('&')[0],
    dfT = (dfFn || '').replace('TIME_SERIES_', ''),
    interval = dfT.split('_').map(token => (0, _fnAdapter.toUpperCaseFirst)(token.toLowerCase())).join(' ');
  return [dfT, interval];
};
const _crEodQuery = option => {
  const {
      items
    } = option,
    [_stockItem, _intervalItem] = items,
    [ticket, title] = (0, _fnAdapter.getValueCaption)(_stockItem),
    [intervalValue, subtitle] = (0, _fnAdapter.getValueCaption)(_intervalItem),
    [dfT, interval] = _getInterval(intervalValue);
  (0, _fnAdapter.assign)(option, {
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
  const {
      dfFn,
      items
    } = option,
    ticket = (0, _fnAdapter.getValue)(items[0]),
    interval = (0, _fnAdapter.getValue)(items[1]),
    title = `${ticket} (${interval})`;
  (0, _fnAdapter.assign)(option, {
    ticket,
    interval,
    title,
    itemCaption: title
  });
  return `${_crFnSymbolQuery(dfFn, ticket)}&interval=${interval}`;
};
const _crIncomeQuery = option => {
  const {
      items,
      itemCaption,
      dfFn
    } = option,
    _symbol = (0, _fnAdapter.getValue)(items[0]);
  (0, _fnAdapter.assign)(option, {
    itemCaption: itemCaption.replace((0, _fnAdapter.getCaption)(items[0]), _symbol),
    dfItem: (0, _fnAdapter.getValue)(items[1]),
    dfPeriod: (0, _fnAdapter.getValue)(items[2])
  });
  return _crFnSymbolQuery(dfFn, _symbol);
};
const _crEarningQuery = option => {
  const {
      items,
      dfFn
    } = option,
    _symbol = (0, _fnAdapter.getValue)(items[0]);
  (0, _fnAdapter.assign)(option, {
    itemCaption: _symbol,
    dfPeriod: (0, _fnAdapter.getValue)(items[1])
  });
  return _crFnSymbolQuery(dfFn, _symbol);
};
const _crDfQuery = _ref => {
  let {
    ticket = 'MSFT',
    period = 50,
    indicator = 'SMA'
  } = _ref;
  return `${_crFnSymbolQuery(indicator, ticket)}&interval=daily&time_period=${period}&series_type=close`;
};
const _crTopGlQuery = () => (0, _AvFn.crFunctionQuery)('TOP_GAINERS_LOSERS');
const _crCrQuery = option => {
  const {
      items
    } = option,
    symbol = (0, _fnAdapter.getValue)(items[0]),
    market = (0, _fnAdapter.getValue)(items[1]);
  (0, _fnAdapter.assign)(option, {
    itemCaption: `${symbol}/${market}`
  });
  return `${(0, _AvFn.crFunctionQuery)('DIGITAL_CURRENCY_DAILY')}&symbol=${symbol}&market=${market}`;
};
const _fCrQuery1 = fnName => option => {
  const {
      items
    } = option,
    symbol = (0, _fnAdapter.getValue)(items[0]);
  return `${(0, _AvFn.crFunctionQuery)(fnName)}&symbol=${symbol}`;
};
const _getCrQuery = (0, _fnAdapter.crGetRoute)({
  CR: _crCrQuery,
  [_fnAdapter.DF_FN_EOD]: _crEodQuery,
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