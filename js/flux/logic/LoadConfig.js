"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Type = require("../../constants/Type");

var _loadQuandlCommodityTrade = require("./loadQuandlCommodityTrade");

var _LoadImpl = _interopRequireDefault(require("./LoadImpl"));

const LoadConfig = {
  [_Type.LoadType.Q]: _LoadImpl.default.Quandl,
  [_Type.LoadType.QCT]: _loadQuandlCommodityTrade.loadQuandlCommodityTrade,
  [_Type.LoadType.DBN]: _LoadImpl.default.DbNomics,
  [_Type.LoadType.AL]: _LoadImpl.default.AlphaVantage,
  [_Type.LoadType.IEX]: _LoadImpl.default.Iex,
  [_Type.LoadType.FMP]: _LoadImpl.default.Fmp,
  [_Type.LoadType.TW]: _LoadImpl.default.Tw,
  [_Type.LoadType.EU_STAT]: _LoadImpl.default.EuroStat,
  [_Type.LoadType.FS]: _LoadImpl.default.Insee,
  [_Type.LoadType.UKS]: _LoadImpl.default.StatUk,
  [_Type.LoadType.NST]: _LoadImpl.default.StatNorway,
  [_Type.LoadType.NST_2]: _LoadImpl.default.StatNorway2,
  [_Type.LoadType.SWS]: _LoadImpl.default.StatSweden,
  [_Type.LoadType.SFL]: _LoadImpl.default.StatFinland,
  [_Type.LoadType.SDN]: _LoadImpl.default.StatDenmark,
  [_Type.LoadType.SIR]: _LoadImpl.default.StatIreland,
  [_Type.LoadType.BEA]: _LoadImpl.default.Bea,
  [_Type.LoadType.BLS]: _LoadImpl.default.Bls,
  [_Type.LoadType.EIA]: _LoadImpl.default.Eia,
  [_Type.LoadType.INTR]: _LoadImpl.default.Intrinio,
  [_Type.LoadType.CRC]: _LoadImpl.default.Crc,
  [_Type.LoadType.CG]: _LoadImpl.default.Cg,
  [_Type.LoadType.CM]: _LoadImpl.default.Cm,
  [_Type.LoadType.CP]: _LoadImpl.default.Cp,
  [_Type.LoadType.CL]: _LoadImpl.default.Cl,
  [_Type.LoadType.BN]: _LoadImpl.default.Bn,
  [_Type.LoadType.BF]: _LoadImpl.default.Bf,
  [_Type.LoadType.BT]: _LoadImpl.default.Bt,
  [_Type.LoadType.FS]: _LoadImpl.default.Insee,
  [_Type.LoadType.UN]: _LoadImpl.default.UnComtrade,
  [_Type.LoadType.FAO]: _LoadImpl.default.FaoStat,
  [_Type.LoadType.WB]: _LoadImpl.default.WorldBank,
  [_Type.LoadType.WATCH_LIST]: _LoadImpl.default.Quandl,
  [_Type.LoadType.WL]: _LoadImpl.default.Quandl
};
var _default = LoadConfig;
exports.default = _default;
//# sourceMappingURL=LoadConfig.js.map