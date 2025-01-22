import { toFixedNumber } from "../../math/mathFn";
import { getYmdhmUTC } from "../AdapterFn";

import {
  crRankProps,
  crNameProps,
  crNumberProps,
  crStyleBold,
  crTableRows,
  crTableConfig
} from "../toTableFn";

const _formatStrToFixedNumber = (
  v
) => toFixedNumber(parseFloat(v));

const _crPriceChangeItem = (
  name,
  propName,
  isHide
) => ({
  ...crNameProps(
    name,
    propName,
    isHide
  ),
  toN: [2],
  isR: true
})
, _crStrToFixedNumberProps = () => ({
  isF: true,
  fn: _formatStrToFixedNumber,
  ...crStyleBold()
})
, _crFormatNumberProps = () => ({
  toN: [0],
  isF: true,
  ...crStyleBold()
});

const HEADERS = [
  crRankProps()
, {
  ...crNameProps("Sybmol", "symbol"),
  ...crStyleBold()
}
, crNameProps("Name", true)
, {
  ...crNameProps("Price", "priceUsd"),
  ..._crStrToFixedNumberProps()
}, {
  ...crNameProps("Vwap 24h", "vwap24Hr", true),
  ..._crStrToFixedNumberProps()
}, {
  ..._crPriceChangeItem("% 24h", "changePercent24Hr"),
}
, {
  ...crNameProps("Supply", true),
  ...crNumberProps(0)
}, {
  ...crNameProps("Max Supply", "maxSupply", true),
  ...crNumberProps(0)
}, {
  ...crNameProps("Market Cap", "marketCapUsd", true),
  ..._crFormatNumberProps()
}, {
  ...crNameProps("Volume USD 24h", "volumeUsd24Hr"),
  ..._crFormatNumberProps()
}];

export const toAssetList = {
  toConfig(json, option){
    const { key, title } = option
    , _rows = crTableRows(HEADERS, json.data)
    , config = crTableConfig({
      id: key, title,
      headers: HEADERS,
      rows: _rows,
      dataSource: `CoinCap ${getYmdhmUTC()}`
    });
    return { config };
  }
}
