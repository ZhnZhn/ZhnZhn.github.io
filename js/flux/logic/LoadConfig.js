'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadConfig;

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _Type = require('../../constants/Type');

var _loadQuandl = require('./loadQuandl');

var _loadQuandlCommodityTrade = require('./loadQuandlCommodityTrade');

var _loadEuroStat = require('./loadEuroStat');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoadConfig = (_LoadConfig = {}, _defineProperty(_LoadConfig, _Type.LoadType.Q, _loadQuandl.loadQuandl), _defineProperty(_LoadConfig, _Type.LoadType.QCT, _loadQuandlCommodityTrade.loadQuandlCommodityTrade), _defineProperty(_LoadConfig, _Type.LoadType.EU_STAT, _loadEuroStat.loadEuroStat), _defineProperty(_LoadConfig, _ChartType2.default.WATCH_LIST, _loadQuandl.loadQuandl), _defineProperty(_LoadConfig, _Type.LoadType.WL, _loadQuandl.loadQuandl), _LoadConfig);

exports.default = LoadConfig;
//# sourceMappingURL=LoadConfig.js.map