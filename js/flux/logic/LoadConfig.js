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

var _loadQuandl = require('./loadQuandl');

var _loadBarchart = require('./loadBarchart');

var _loadAlpha = require('./loadAlpha');

var _loadQuandlCommodityTrade = require('./loadQuandlCommodityTrade');

var _loadEuroStat = require('./loadEuroStat');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadConfig = (_LoadConfig = {}, (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.Q, _loadQuandl.loadQuandl), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.B, _loadBarchart.loadBarchart), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.AL, _loadAlpha.loadAlpha), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.QCT, _loadQuandlCommodityTrade.loadQuandlCommodityTrade), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.EU_STAT, _loadEuroStat.loadEuroStat), (0, _defineProperty3.default)(_LoadConfig, _ChartType2.default.WATCH_LIST, _loadQuandl.loadQuandl), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.WL, _loadQuandl.loadQuandl), _LoadConfig);

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map