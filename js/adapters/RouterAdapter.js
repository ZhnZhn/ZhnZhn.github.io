"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LoadType = require("../constants/LoadType");
var _EuroStat = _interopRequireDefault(require("./eurostat/EuroStat"));
var _UnComtrade = _interopRequireDefault(require("./uncomtrade/UnComtrade"));
var _FaoStat = _interopRequireDefault(require("./faostat/FaoStat"));
var _WorldBank = _interopRequireDefault(require("./world-bank/WorldBank"));
var _Insee = _interopRequireDefault(require("./insee/Insee"));
var _StatUk = _interopRequireDefault(require("./stat-uk/StatUk"));
var _StatNorway = require("./stat-norway/StatNorway");
var _StatSweden = _interopRequireDefault(require("./stat-sweden/StatSweden"));
var _StatFinland = _interopRequireDefault(require("./stat-finland/StatFinland"));
var _StatDenmark = _interopRequireDefault(require("./stat-denmark/StatDenmark"));
var _StatIreland = _interopRequireDefault(require("./stat-ireland/StatIreland"));
var _AlphaVantage = _interopRequireDefault(require("./alpha/AlphaVantage"));
var _Iex = _interopRequireDefault(require("./iex/Iex"));
var _Fmp = _interopRequireDefault(require("./fmp/Fmp"));
var _Tw = _interopRequireDefault(require("./twelve/Tw"));
var _Bea = _interopRequireDefault(require("./bea/Bea"));
var _Bls = _interopRequireDefault(require("./bls/Bls"));
var _Eia = _interopRequireDefault(require("./eia/Eia"));
var _Intrinio = _interopRequireDefault(require("./intrinio/Intrinio"));
var _Ndl = _interopRequireDefault(require("./ndl/Ndl"));
var _DbNomics = _interopRequireDefault(require("./db-nomics/DbNomics"));
var _Ei = _interopRequireDefault(require("./ei/Ei"));
var _Ember = _interopRequireDefault(require("./ember/Ember"));
var _En = _interopRequireDefault(require("./environment/En"));
var _Irena = _interopRequireDefault(require("./irena/Irena"));
var _Crc = _interopRequireDefault(require("./crypto-compare/Crc"));
var _Cg = _interopRequireDefault(require("./coin-gecko/Cg"));
var _Cm = _interopRequireDefault(require("./coin-metrics/Cm"));
var _Cp = _interopRequireDefault(require("./coin-paprika/Cp"));
var _Cl = _interopRequireDefault(require("./coin-lore/Cl"));
var _Bn = _interopRequireDefault(require("./binance/Bn"));
var _Cb = _interopRequireDefault(require("./coinbase/Cb"));
var _Bt = _interopRequireDefault(require("./bitstamp/Bt"));
var _Bf = _interopRequireDefault(require("./bitfinex/Bf"));
var _Cr = _interopRequireDefault(require("./cryptocom/Cr"));
var _Kr = _interopRequireDefault(require("./kraken/Kr"));
var _Kc = _interopRequireDefault(require("./kucoin/Kc"));
var _Gt = _interopRequireDefault(require("./gateio/Gt"));
var _Ht = _interopRequireDefault(require("./htx/Ht"));
var _Kx = _interopRequireDefault(require("./okx/Kx"));
var _Bb = _interopRequireDefault(require("./bybit/Bb"));
const RouterAdapter = {
  [_LoadType.LT_Q]: _Ndl.default,
  [_LoadType.LT_DBN]: _DbNomics.default,
  [_LoadType.LT_EI]: _Ei.default,
  [_LoadType.LT_EMB]: _Ember.default,
  [_LoadType.LT_IRE]: _Irena.default,
  [_LoadType.LT_EN]: _En.default,
  [_LoadType.LT_UN]: _UnComtrade.default,
  [_LoadType.LT_FAO]: _FaoStat.default,
  [_LoadType.LT_WB]: _WorldBank.default,
  [_LoadType.LT_EU_STAT]: _EuroStat.default,
  [_LoadType.LT_FS]: _Insee.default,
  [_LoadType.LT_UKS]: _StatUk.default,
  [_LoadType.LT_NST]: _StatNorway.StatNorway,
  [_LoadType.LT_NST_2]: _StatNorway.StatNorway2,
  [_LoadType.LT_SWS]: _StatSweden.default,
  [_LoadType.LT_SFL]: _StatFinland.default,
  [_LoadType.LT_SDN]: _StatDenmark.default,
  [_LoadType.LT_SIR]: _StatIreland.default,
  [_LoadType.LT_AL]: _AlphaVantage.default,
  [_LoadType.LT_IEX]: _Iex.default,
  [_LoadType.LT_FMP]: _Fmp.default,
  [_LoadType.LT_TW]: _Tw.default,
  [_LoadType.LT_BEA]: _Bea.default,
  [_LoadType.LT_BLS]: _Bls.default,
  [_LoadType.LT_EIA]: _Eia.default,
  [_LoadType.LT_INTR]: _Intrinio.default,
  [_LoadType.LT_CRC]: _Crc.default,
  [_LoadType.LT_CG]: _Cg.default,
  [_LoadType.LT_CM]: _Cm.default,
  [_LoadType.LT_CP]: _Cp.default,
  [_LoadType.LT_CL]: _Cl.default,
  [_LoadType.LT_BN]: _Bn.default,
  [_LoadType.LT_CB]: _Cb.default,
  [_LoadType.LT_BT]: _Bt.default,
  [_LoadType.LT_CR]: _Cr.default,
  [_LoadType.LT_BF]: _Bf.default,
  [_LoadType.LT_KR]: _Kr.default,
  [_LoadType.LT_KC]: _Kc.default,
  [_LoadType.LT_GT]: _Gt.default,
  [_LoadType.LT_HT]: _Ht.default,
  [_LoadType.LT_KX]: _Kx.default,
  [_LoadType.LT_BB]: _Bb.default,
  [_LoadType.LT_WATCH_LIST]: _Ndl.default,
  [_LoadType.LT_WL]: _Ndl.default
};
var _default = exports.default = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map