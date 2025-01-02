"use strict";

exports.__esModule = true;
exports.toAssetListAdapter = void 0;
var _mathFn = require("../../math/mathFn");
var _AdapterFn = require("../AdapterFn");
var _toTableFn = require("../toTableFn");
const _formatStrToFixedNumber = v => (0, _mathFn.toFixedNumber)(parseFloat(v));
const _crPriceChangeItem = (name, propName, isHide) => ({
    ...(0, _toTableFn.crNameProps)(name, propName, isHide),
    toN: [2],
    isR: true
  }),
  _crNumberCenterProps = () => ({
    toN: [],
    style: {
      textAlign: "center"
    }
  }),
  _crStrToFixedNumberProps = () => ({
    isF: true,
    fn: _formatStrToFixedNumber,
    ...(0, _toTableFn.crStyleBold)()
  }),
  _crFormatNumberProps = () => ({
    toN: [0],
    isF: true,
    ...(0, _toTableFn.crStyleBold)()
  });
const HEADERS = [{
  ...(0, _toTableFn.crNameProps)("Rank"),
  ..._crNumberCenterProps()
}, {
  ...(0, _toTableFn.crNameProps)("Sybmol", "symbol"),
  ...(0, _toTableFn.crStyleBold)()
}, (0, _toTableFn.crNameProps)("Name", true), {
  ...(0, _toTableFn.crNameProps)("Price", "priceUsd"),
  ..._crStrToFixedNumberProps()
}, {
  ...(0, _toTableFn.crNameProps)("Vwap 24h", "vwap24Hr", true),
  ..._crStrToFixedNumberProps()
}, {
  ..._crPriceChangeItem("% 24h", "changePercent24Hr")
}, {
  ...(0, _toTableFn.crNameProps)("Supply", true),
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  ...(0, _toTableFn.crNameProps)("Max Supply", "maxSupply", true),
  ...(0, _toTableFn.crNumberProps)(0)
}, {
  ...(0, _toTableFn.crNameProps)("Market Cap", "marketCapUsd", true),
  ..._crFormatNumberProps()
}, {
  ...(0, _toTableFn.crNameProps)("Volume USD 24h", "volumeUsd24Hr"),
  ..._crFormatNumberProps()
}];
const toAssetListAdapter = exports.toAssetListAdapter = {
  toConfig(json, option) {
    const {
        key,
        title
      } = option,
      _rows = (0, _toTableFn.crTableRows)(HEADERS, json.data),
      config = (0, _toTableFn.crTableConfig)({
        id: key,
        title,
        headers: HEADERS,
        rows: _rows,
        dataSource: `CoinCap ${(0, _AdapterFn.getYmdhmUTC)()}`
      });
    return {
      config
    };
  }
};
//# sourceMappingURL=toAssetListAdapter.js.map