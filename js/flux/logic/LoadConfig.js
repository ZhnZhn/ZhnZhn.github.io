'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _LoadConfig;

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _Type = require('../../constants/Type');

var _loadQuandlCommodityTrade = require('./loadQuandlCommodityTrade');

var _LoadImpl = require('./LoadImpl');

var _LoadImpl2 = _interopRequireDefault(_LoadImpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadConfig = (_LoadConfig = {}, (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.Q, _LoadImpl2.default.Quandl), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.QCT, _loadQuandlCommodityTrade.loadQuandlCommodityTrade), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.B, _LoadImpl2.default.Barchart), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.AL, _LoadImpl2.default.AlphaIndicator), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.AL_S, _LoadImpl2.default.AlphaSector), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.AL_I, _LoadImpl2.default.AlphaIntraday), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.IEX, _LoadImpl2.default.Iex), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.EU_STAT, _LoadImpl2.default.EuroStat), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.NST, _LoadImpl2.default.StatNorway), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.NST_2, _LoadImpl2.default.StatNorway2), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.SWS, _LoadImpl2.default.StatSweden), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.BEA, _LoadImpl2.default.Bea), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.INTR, _LoadImpl2.default.Intrinio), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.FS, _LoadImpl2.default.Insee), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.UN, _LoadImpl2.default.UnComtrade), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.FAO, _LoadImpl2.default.FaoStat), (0, _defineProperty3.default)(_LoadConfig, _ChartType2.default.WATCH_LIST, _LoadImpl2.default.Quandl), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.WL, _LoadImpl2.default.Quandl), _LoadConfig);

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map