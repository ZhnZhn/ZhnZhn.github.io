"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isEmpty = _interopRequireDefault(require("../../utils/isEmpty"));
var _fnAdapter = require("./fnAdapter");
const ROOT = 'https://www.alphavantage.co/query',
  ERR_PROP = 'Error Message',
  INFO_PROP = 'Information',
  REQ_ERROR = 'Request Error',
  _assign = Object.assign,
  _crFunctionQuery = value => "function=" + value;
const _crEconomicsQuery = option => {
  const {
      items
    } = option,
    [value, itemCaption] = (0, _fnAdapter.getValueCaption)(items[0]);
  _assign(option, {
    itemCaption
  });
  return _crFunctionQuery(value);
};
const _isDailyInterval = (0, _fnAdapter.isInArrStr)(['daily', 'weekly']),
  _isQuarterlyInterval = (0, _fnAdapter.isInArrStr)(['quarterly', 'annual']);
const _checkCommoditiesParams = (item, interval) => {
  const [itemId, itemCaption] = (0, _fnAdapter.getValueCaption)(item),
    [intervalId, _intervalCaption] = (0, _fnAdapter.getValueCaption)(interval);
  if (!item.dw && _isDailyInterval(intervalId) || item.dw && _isQuarterlyInterval(intervalId)) {
    throw (0, _fnAdapter.crError)(REQ_ERROR, "Interval " + _intervalCaption + " is absent for " + itemCaption);
  }
  return [itemId, itemCaption, intervalId];
};
const _crCommoditiesQuery = option => {
  const {
      items
    } = option,
    [item, interval] = items,
    [itemId, itemCaption, intervalId] = _checkCommoditiesParams(item, interval);
  _assign(option, {
    itemCaption
  });
  return _crFunctionQuery(itemId) + "&interval=" + intervalId;
};
const _crFnSymbolQuery = (fnName, symbol) => _crFunctionQuery(fnName) + "&symbol=" + symbol;
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
  _assign(option, {
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
    title = ticket + " (" + interval + ")";
  _assign(option, {
    ticket,
    interval,
    title,
    itemCaption: title
  });
  return _crFnSymbolQuery(dfFn, ticket) + "&interval=" + interval;
};
const _crIncomeQuery = option => {
  const {
      items,
      itemCaption,
      dfFn
    } = option,
    _symbol = (0, _fnAdapter.getValue)(items[0]);
  _assign(option, {
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
  _assign(option, {
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
  return _crFnSymbolQuery(indicator, ticket) + "&interval=daily&time_period=" + period + "&series_type=close";
};
const _crTopGlQuery = () => _crFunctionQuery('TOP_GAINERS_LOSERS');
const _routerQuery = {
  DF: _crDfQuery,
  ECONOMICS: _crEconomicsQuery,
  CM: _crCommoditiesQuery,
  [_fnAdapter.DF_FN_EOD]: _crEodQuery,
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
      } = option,
      _crQuery = dfFn && _routerQuery[dfFn] || _routerQuery.DF,
      _queryParam = _crQuery(option);
    option.apiKey = void 0;
    return ROOT + "?" + _queryParam + "&apikey=" + apiKey;
  },
  checkResponse(json) {
    if ((0, _isEmpty.default)(json)) {
      throw (0, _fnAdapter.crError)();
    }
    const _msg = json[ERR_PROP] || json[INFO_PROP];
    if (_msg) {
      throw (0, _fnAdapter.crError)(REQ_ERROR, _msg);
    }
  }
};
var _default = AlphaApi;
exports.default = _default;
//# sourceMappingURL=Api.js.map