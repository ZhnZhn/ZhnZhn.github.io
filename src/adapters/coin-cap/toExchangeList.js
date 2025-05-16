import {
  isNumber,
  parseIntBy10
} from "../../utils/isTypeFn";

import {
  mlsToDmy
} from "../AdapterFn";

import {
  crNameProps,
  crNumberProps,
  crRankProps,
  crStyleBold,
  crTableRows,
  crTableConfig
} from "../toTableFn";

const HEADERS = [
  crRankProps(),{
  ...crNameProps("Name"),
  ...crStyleBold()
},{
  ...crNameProps("Total Volume %", "percentTotalVolume"),
  ...crNumberProps(2)
},{
  ...crNameProps("Volume USD", "volumeUsd"),
  ...crNumberProps(0)
},{
  ...crNameProps("Trading Pairs", "tradingPairs", true),
  ...crStyleBold()
}];

const NUMBER_PER_PAGE_ITEMS = 10;
const _filterData = (
  data,
  option
) => {
  const { pageNumber } = option
  , _fromRank = (pageNumber-1)*NUMBER_PER_PAGE_ITEMS
  , _toRank = pageNumber*NUMBER_PER_PAGE_ITEMS;
  return data.filter(item => {
    const _rankNumber = parseIntBy10(item.rank);
    return _rankNumber > _fromRank && _rankNumber <= _toRank;
  })
};

const _crOnDate = (
  timestamp
) => isNumber(timestamp)
  ? mlsToDmy(timestamp)
  : "";

export const toExchangeList = {
  toConfig(json, option){
    const {
      key,
      title
    } = option
    , _rows = crTableRows(
      HEADERS,
      _filterData(json.data, option)
    )
    , config = crTableConfig({
       id: key, title,
       headers: HEADERS,
       rows: _rows,
       dataSource: `CoinCap ${_crOnDate(json.timestamp)}`
    });
    return { config };
  }
}
