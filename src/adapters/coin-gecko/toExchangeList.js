import {
  crRankProps,
  crStyleCenter,
  crNameProps,
  crNumberProps,
  crTableRows,
  crTableConfig
} from "../toTableFn";
import {
  crPageConfig,
  getYmdhmUTC
} from "./fnAdapter";

const PN_TRADE_VOLUME_24H_BTC = "trade_volume_24h_btc"
, HEADERS = [
  crRankProps("Trust Rank", "trust_score_rank")
, crNameProps("Name")
, {
  ...crNameProps("24h BTC", PN_TRADE_VOLUME_24H_BTC),
  ...crNumberProps(0)
}
, crRankProps("Trust Score", "trust_score")
, {
  ...crNameProps("Year Estb.", "year_established", true),
  ...crStyleCenter()
}
, crNameProps("Country", true)
, {
  ...crNameProps("Link", "url", true),
  isHref: true
}];

const toExchangeList = {
  crKey(option){
    option.key = crPageConfig(option).join("_");
    return option.key;
  },

  toConfig(json, option){
    const { key, title } = option
    , _rows = crTableRows(HEADERS, json)
    , config = crTableConfig({
      id: key, title,
      headers: HEADERS,
      rows: _rows,
      dataSource: `CoinGecko ${getYmdhmUTC()}`,
      fns: {
        valueToHref: (id, v) => v
      }
    });
    return { config };
  }
}

export default toExchangeList
