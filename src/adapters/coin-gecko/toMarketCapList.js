import {
  toTimeDate,
  fCrLazyValue
} from "../AdapterFn";

import {
  crStyleBold,
  crStyleCenter,
  crNameProps,
  crNumberProps,
  crCaptionItemsProps,
  crTableFlatHeaders,
  crTableRows,
  crTableConfig
} from "../toTableFn";
import { crPageConfig } from "./fnAdapter";

const CHANGE_PERCENTAGE = "change_percentage"
, PERCENT_PROPS = {
  toN: [2],
  isR: true
}
, _crPriceChangeItem = (
  name,
  pnSuffix,
  isHide
) => ({
  ...crNameProps(
    name,
    `price_${CHANGE_PERCENTAGE}_${pnSuffix}`,
    isHide
  ),
  ...PERCENT_PROPS
})
, _crChangePercentageItem = (
  name,
  pnPrefix
) => ({
  ...crNameProps(
    name,
    `${pnPrefix}_${CHANGE_PERCENTAGE}`,
    true
  ),
  ...PERCENT_PROPS
})
, _crNumberItem = (
  name,
  pn,
  isHide,
  n
) => ({
  ...crNameProps(name, pn),
  ...crNumberProps(n),
  isHide: !!isHide
})
, _crSupplyItem = (
  name
) => _crNumberItem(
  name,
  `${name.split(" ")[0].toLowerCase()}_supply`,
  true,
  0
)
, _crUtcItem = (
  name,
  pn
) => ({
  ...crNameProps(name, pn, true),
  isF: true,
  fn: toTimeDate
});

const _getTableHeaders = fCrLazyValue(() => {
  const headers = [
    {
      ...crStyleCenter(),
      ...crNameProps("Rank", "market_cap_rank"),
      toN: []
    },
    crNameProps("Name"),
    {
      ...crNameProps("Symbol", true),
      ...crStyleBold({ textTransform: "uppercase" })
    },
    crCaptionItemsProps("Price Change %", [
       _crPriceChangeItem("1h %", "1h_in_currency"),
       _crPriceChangeItem("24h %", "24h"),
       _crPriceChangeItem("7d %", "7d_in_currency"),
       _crPriceChangeItem("30d %", "30d_in_currency", true),
       _crPriceChangeItem("1y %", "1y_in_currency", true),
    ]),
    crCaptionItemsProps("Price", [
      _crNumberItem("High 24h", "high_24h", true),
      _crNumberItem("Price", "current_price"),
      _crNumberItem("Low 24h", "low_24h", true)
    ]),
    crCaptionItemsProps("ATH, ATL", [
      _crNumberItem("ATH", "ath", true),
      _crChangePercentageItem("ATH %", "ath"),
      _crUtcItem("ATH Date UTC", "ath_date"),

      _crNumberItem("ATL", "atl", true),
      _crChangePercentageItem("ATL %", "atl"),
      _crUtcItem("ATL Date UTC", "atl_date")
    ]),
    crCaptionItemsProps("Supply", [
      _crSupplyItem("Circulating"),
      _crSupplyItem("Total Supply"),
      _crSupplyItem("Max Supply")
    ]),
    _crNumberItem("MarketCap", "market_cap"),
    _crUtcItem("Updated UTC", "last_updated")
  ];
  return [
    headers,
    crTableFlatHeaders(headers)
  ];
});

const _crDataSource = (
  rows
) => `CoinGecko ${toTimeDate((rows[0] || {}).last_updated)} UTC`;

const toMarketCapList = {
  crKey(option){
    option.key = crPageConfig(option).join("_");
    return option.key;
  },

  toConfig(json, option){
    const [
      headers,
      flatHeaders
    ] = _getTableHeaders()
    , rows = crTableRows(flatHeaders, json)
    , config = crTableConfig({
      id: option.key,
      title: option.title,
      headers, flatHeaders, rows,
      dataSource: _crDataSource(rows)
    });
    return { config };
  }
}

export default toMarketCapList
