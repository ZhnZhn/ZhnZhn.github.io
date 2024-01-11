"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LoadType = require("../../constants/LoadType");
var _loadNdlCommodityTrade = require("./loadNdlCommodityTrade");
var _LoadImpl = _interopRequireDefault(require("./LoadImpl"));
const LoadConfig = {
  [_LoadType.LT_Q]: _LoadImpl.default.Ndl,
  [_LoadType.LT_QCT]: _loadNdlCommodityTrade.loadNdlCommodityTrade,
  [_LoadType.LT_DBN]: _LoadImpl.default.DbNomics,
  [_LoadType.LT_EI]: _LoadImpl.default.Ei,
  [_LoadType.LT_EMB]: _LoadImpl.default.Ember,
  [_LoadType.LT_IRE]: _LoadImpl.default.Irena,
  [_LoadType.LT_AL]: _LoadImpl.default.AlphaVantage,
  [_LoadType.LT_IEX]: _LoadImpl.default.Iex,
  [_LoadType.LT_FMP]: _LoadImpl.default.Fmp,
  [_LoadType.LT_TW]: _LoadImpl.default.Tw,
  [_LoadType.LT_EU_STAT]: _LoadImpl.default.EuroStat,
  [_LoadType.LT_FS]: _LoadImpl.default.Insee,
  [_LoadType.LT_UKS]: _LoadImpl.default.StatUk,
  [_LoadType.LT_NST]: _LoadImpl.default.StatNorway,
  [_LoadType.LT_NST_2]: _LoadImpl.default.StatNorway2,
  [_LoadType.LT_SWS]: _LoadImpl.default.StatSweden,
  [_LoadType.LT_SFL]: _LoadImpl.default.StatFinland,
  [_LoadType.LT_SDN]: _LoadImpl.default.StatDenmark,
  [_LoadType.LT_SIR]: _LoadImpl.default.StatIreland,
  [_LoadType.LT_BEA]: _LoadImpl.default.Bea,
  [_LoadType.LT_BLS]: _LoadImpl.default.Bls,
  [_LoadType.LT_EIA]: _LoadImpl.default.Eia,
  [_LoadType.LT_INTR]: _LoadImpl.default.Intrinio,
  [_LoadType.LT_CRC]: _LoadImpl.default.Crc,
  [_LoadType.LT_CG]: _LoadImpl.default.Cg,
  [_LoadType.LT_CM]: _LoadImpl.default.Cm,
  [_LoadType.LT_CP]: _LoadImpl.default.Cp,
  [_LoadType.LT_CL]: _LoadImpl.default.Cl,
  [_LoadType.LT_BN]: _LoadImpl.default.Bn,
  [_LoadType.LT_BT]: _LoadImpl.default.Bt,
  [_LoadType.LT_BF]: _LoadImpl.default.Bf,
  [_LoadType.LT_KC]: _LoadImpl.default.Kc,
  [_LoadType.LT_GT]: _LoadImpl.default.Gt,
  [_LoadType.LT_UN]: _LoadImpl.default.UnComtrade,
  [_LoadType.LT_FAO]: _LoadImpl.default.FaoStat,
  [_LoadType.LT_WB]: _LoadImpl.default.WorldBank,
  [_LoadType.LT_WATCH_LIST]: _LoadImpl.default.Ndl,
  [_LoadType.LT_WL]: _LoadImpl.default.Ndl
};
var _default = exports.default = LoadConfig;
//# sourceMappingURL=LoadConfig.js.map