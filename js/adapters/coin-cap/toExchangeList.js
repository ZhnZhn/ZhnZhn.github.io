"use strict";

exports.__esModule = true;
exports.toExchangeList = void 0;
var _AdapterFn = require("../AdapterFn");
var _toTableFn = require("../toTableFn");
const HEADERS = [(0, _toTableFn.crRankProps)(), {
  ...(0, _toTableFn.crNameProps)("Name"),
  ...(0, _toTableFn.crStyleBold)()
}, {
  ...(0, _toTableFn.crNameProps)("Total Volume %", "percentTotalVolume"),
  ...(0, _toTableFn.crNumberProps)(2)
}, {
  ...(0, _toTableFn.crNameProps)("Volume USD", "volumeUsd"),
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  ...(0, _toTableFn.crNameProps)("Trading Pairs", "tradingPairs", true),
  ...(0, _toTableFn.crStyleBold)()
}];
const NUMBER_PER_PAGE_ITEMS = 10;
const _filterData = (data, option) => {
  const pageNumber = parseInt((0, _AdapterFn.getItemsValue)(option)) || 1,
    _fromRank = (pageNumber - 1) * NUMBER_PER_PAGE_ITEMS,
    _toRank = pageNumber * NUMBER_PER_PAGE_ITEMS;
  return data.filter(item => {
    const _rankNumber = parseInt(item.rank);
    return _rankNumber > _fromRank && _rankNumber <= _toRank;
  });
};
const _crOnDate = timestamp => (0, _AdapterFn.isNumber)(timestamp) ? (0, _AdapterFn.mlsToDmy)(timestamp) : "";
const toExchangeList = exports.toExchangeList = {
  toConfig(json, option) {
    const {
        key,
        title
      } = option,
      _rows = (0, _toTableFn.crTableRows)(HEADERS, _filterData(json.data, option)),
      config = (0, _toTableFn.crTableConfig)({
        id: key,
        title,
        headers: HEADERS,
        rows: _rows,
        dataSource: `CoinCap ${_crOnDate(json.timestamp)}`
      });
    return {
      config
    };
  }
};
//# sourceMappingURL=toExchangeList.js.map