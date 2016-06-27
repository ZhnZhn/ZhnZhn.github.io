'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartType = require('../../constants/ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

var _loadQuandl = require('./loadQuandl');

var _loadQuandlCommodityTrade = require('./loadQuandlCommodityTrade');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoadConfig = _defineProperty({
  Q: _loadQuandl.loadQuandl,
  QCT: _loadQuandlCommodityTrade.loadQuandlCommodityTrade
}, _ChartType2.default.WATCH_LIST, _loadQuandl.loadQuandl);

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map