"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _toTableFn = require("../toTableFn");
var _fnAdapter = require("./fnAdapter");
const CHANGE_PERCENTAGE = "change_percentage",
  PERCENT_PROPS = {
    toN: [2],
    isR: true
  },
  _crPriceChangeItem = (name, pnSuffix, isHide) => ({
    ...(0, _toTableFn.crNameProps)(name, `price_${CHANGE_PERCENTAGE}_${pnSuffix}`, isHide),
    ...PERCENT_PROPS
  }),
  _crChangePercentageItem = (name, pnPrefix) => ({
    ...(0, _toTableFn.crNameProps)(name, `${pnPrefix}_${CHANGE_PERCENTAGE}`, true),
    ...PERCENT_PROPS
  }),
  _crNumberItem = (name, pn, isHide, n) => ({
    ...(0, _toTableFn.crNameProps)(name, pn),
    ...(0, _toTableFn.crNumberProps)(n),
    isHide: !!isHide
  }),
  _crSupplyItem = name => _crNumberItem(name, `${name.split(" ")[0].toLowerCase()}_supply`, true, 0),
  _crUtcItem = (name, pn) => ({
    ...(0, _toTableFn.crNameProps)(name, pn, true),
    isF: true,
    fn: _AdapterFn.toTimeDate
  });
const _getTableHeaders = (0, _AdapterFn.fCrLazyValue)(() => {
  const headers = [{
    ...(0, _toTableFn.crStyleCenter)(),
    ...(0, _toTableFn.crNameProps)("Rank", "market_cap_rank"),
    toN: []
  }, (0, _toTableFn.crNameProps)("Name"), {
    ...(0, _toTableFn.crNameProps)("Symbol", true),
    ...(0, _toTableFn.crStyleBold)({
      textTransform: "uppercase"
    })
  }, (0, _toTableFn.crCaptionItemsProps)("Price Change %", [_crPriceChangeItem("1h %", "1h_in_currency"), _crPriceChangeItem("24h %", "24h"), _crPriceChangeItem("7d %", "7d_in_currency"), _crPriceChangeItem("30d %", "30d_in_currency", true), _crPriceChangeItem("1y %", "1y_in_currency", true)]), (0, _toTableFn.crCaptionItemsProps)("Price", [_crNumberItem("High 24h", "high_24h", true), _crNumberItem("Price", "current_price"), _crNumberItem("Low 24h", "low_24h", true)]), (0, _toTableFn.crCaptionItemsProps)("ATH, ATL", [_crNumberItem("ATH", "ath", true), _crChangePercentageItem("ATH %", "ath"), _crUtcItem("ATH Date UTC", "ath_date"), _crNumberItem("ATL", "atl", true), _crChangePercentageItem("ATL %", "atl"), _crUtcItem("ATL Date UTC", "atl_date")]), (0, _toTableFn.crCaptionItemsProps)("Supply", [_crSupplyItem("Circulating"), _crSupplyItem("Total Supply"), _crSupplyItem("Max Supply")]), _crNumberItem("MarketCap", "market_cap"), _crUtcItem("Updated UTC", "last_updated")];
  return [headers, (0, _toTableFn.crTableFlatHeaders)(headers)];
});
const _crDataSource = rows => `CoinGecko ${(0, _AdapterFn.toTimeDate)((rows[0] || {}).last_updated)} UTC`;
const toMarketCapList = {
  crKey(option) {
    option.key = (0, _fnAdapter.crPageConfig)(option).join("_");
    return option.key;
  },
  toConfig(json, option) {
    const [headers, flatHeaders] = _getTableHeaders(),
      rows = (0, _toTableFn.crTableRows)(flatHeaders, json),
      config = (0, _toTableFn.crTableConfig)({
        id: option.key,
        title: option.title,
        headers,
        flatHeaders,
        rows,
        dataSource: _crDataSource(rows)
      });
    return {
      config
    };
  }
};
var _default = exports.default = toMarketCapList;
//# sourceMappingURL=toMarketCapList.js.map