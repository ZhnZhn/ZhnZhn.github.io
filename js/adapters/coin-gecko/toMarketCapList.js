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
  _crStyleItem = (name, pn, options) => ({
    ...(0, _toTableFn.crNameProps)(name, pn),
    ...(0, _toTableFn.crStyleBold)(),
    toN: [],
    ...options
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
  }, (0, _toTableFn.crCaptionItemsProps)("Price Change %", [_crPriceChangeItem("1h %", "1h_in_currency"), _crPriceChangeItem("24h %", "24h"), _crPriceChangeItem("7d %", "7d_in_currency"), _crPriceChangeItem("30d %", "30d_in_currency", true), _crPriceChangeItem("1y %", "1y_in_currency", true), _crStyleItem("Price", "current_price")]), (0, _toTableFn.crCaptionItemsProps)("ATH, ATL", [_crStyleItem("ATH", "ath", {
    isHide: true
  }), _crChangePercentageItem("ATH %", "ath"), (0, _toTableFn.crNameProps)("ATH Date UTC", "ath_date", true), _crStyleItem("ATL", "atl", {
    isHide: true
  }), _crChangePercentageItem("ATL %", "atl"), (0, _toTableFn.crNameProps)("ATL Date UTC", "atl_date", true)]), _crStyleItem("MarketCap", "market_cap", {
    isF: true
  }), (0, _toTableFn.crNameProps)("Updated UTC", "last_updated", true)];
  return [headers, (0, _toTableFn.crTableFlatHeaders)(headers)];
});
const _transformDate = json => json.map(item => {
  item.last_updated = (0, _AdapterFn.toTimeDate)(item.last_updated);
  item.ath_date = (0, _AdapterFn.toTimeDate)(item.ath_date);
  item.atl_date = (0, _AdapterFn.toTimeDate)(item.atl_date);
  return item;
});
const _crDataSource = rows => `CoinGecko ${rows[0].last_updated} UTC`;
const toMarketCapList = {
  crKey(option) {
    option.key = (0, _fnAdapter.crPageConfig)(option).join("_");
    return option.key;
  },
  toConfig(json, option) {
    const _json = _transformDate(json),
      [headers, flatHeaders] = _getTableHeaders(),
      rows = (0, _toTableFn.crTableRows)(flatHeaders, _json),
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