'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _DialogType = require('../../constants/DialogType');

var _loadQuandl = require('./loadQuandl');

var _loadQuandlCommodityTrade = require('./loadQuandlCommodityTrade');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadConfig = {};

var addConfig = function addConfig(obj, fn) {
  for (var key in obj) {
    LoadConfig[obj[key]] = fn;
  }
};
addConfig(_DialogType.Quandl, _loadQuandl.loadQuandl);
addConfig(_DialogType.QuandlGoogle, _loadQuandl.loadQuandl);
addConfig(_DialogType.QuandlYahoo, _loadQuandl.loadQuandl);
LoadConfig[_ChartType2.default.WATCH_LIST] = _loadQuandl.loadQuandl;
LoadConfig[_ChartType2.default.QUANDL_COMMODITY_TRADE] = _loadQuandlCommodityTrade.loadQuandlCommodityTrade;

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map