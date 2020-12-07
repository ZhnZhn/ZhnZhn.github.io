"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartType = _interopRequireDefault(require("../../constants/ChartType"));

var _Type = require("../../constants/Type");

var _loadQuandlCommodityTrade = require("./loadQuandlCommodityTrade");

var _LoadImpl = _interopRequireDefault(require("./LoadImpl"));

var _LoadConfig;

var LoadConfig = (_LoadConfig = {}, _LoadConfig[_Type.LoadType.Q] = _LoadImpl["default"].Quandl, _LoadConfig[_Type.LoadType.QCT] = _loadQuandlCommodityTrade.loadQuandlCommodityTrade, _LoadConfig[_Type.LoadType.DBN] = _LoadImpl["default"].DbNomics, _LoadConfig[_Type.LoadType.B] = _LoadImpl["default"].Barchart, _LoadConfig[_Type.LoadType.AL] = _LoadImpl["default"].AlphaVantage, _LoadConfig[_Type.LoadType.IEX] = _LoadImpl["default"].Iex, _LoadConfig[_Type.LoadType.FMP] = _LoadImpl["default"].Fmp, _LoadConfig[_Type.LoadType.EU_STAT] = _LoadImpl["default"].EuroStat, _LoadConfig[_Type.LoadType.FS] = _LoadImpl["default"].Insee, _LoadConfig[_Type.LoadType.UKS] = _LoadImpl["default"].StatUk, _LoadConfig[_Type.LoadType.NST] = _LoadImpl["default"].StatNorway, _LoadConfig[_Type.LoadType.NST_2] = _LoadImpl["default"].StatNorway2, _LoadConfig[_Type.LoadType.SWS] = _LoadImpl["default"].StatSweden, _LoadConfig[_Type.LoadType.SFL] = _LoadImpl["default"].StatFinland, _LoadConfig[_Type.LoadType.BEA] = _LoadImpl["default"].Bea, _LoadConfig[_Type.LoadType.BLS] = _LoadImpl["default"].Bls, _LoadConfig[_Type.LoadType.EIA] = _LoadImpl["default"].Eia, _LoadConfig[_Type.LoadType.INTR] = _LoadImpl["default"].Intrinio, _LoadConfig[_Type.LoadType.CRC] = _LoadImpl["default"].Crc, _LoadConfig[_Type.LoadType.CG] = _LoadImpl["default"].Cg, _LoadConfig[_Type.LoadType.CM] = _LoadImpl["default"].Cm, _LoadConfig[_Type.LoadType.CP] = _LoadImpl["default"].Cp, _LoadConfig[_Type.LoadType.BN] = _LoadImpl["default"].Bn, _LoadConfig[_Type.LoadType.BT] = _LoadImpl["default"].Bt, _LoadConfig[_Type.LoadType.FS] = _LoadImpl["default"].Insee, _LoadConfig[_Type.LoadType.UN] = _LoadImpl["default"].UnComtrade, _LoadConfig[_Type.LoadType.FAO] = _LoadImpl["default"].FaoStat, _LoadConfig[_Type.LoadType.WB] = _LoadImpl["default"].WorldBank, _LoadConfig[_ChartType["default"].WATCH_LIST] = _LoadImpl["default"].Quandl, _LoadConfig[_Type.LoadType.WL] = _LoadImpl["default"].Quandl, _LoadConfig);
var _default = LoadConfig;
exports["default"] = _default;
//# sourceMappingURL=LoadConfig.js.map