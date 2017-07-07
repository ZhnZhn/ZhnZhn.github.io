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

var _implBarchart = require('./implBarchart');

var _implBarchart2 = _interopRequireDefault(_implBarchart);

var _implAlpha = require('./implAlpha');

var _implAlpha2 = _interopRequireDefault(_implAlpha);

var _implAlphaSector = require('./implAlphaSector');

var _implAlphaSector2 = _interopRequireDefault(_implAlphaSector);

var _loadQuandlCommodityTrade = require('./loadQuandlCommodityTrade');

var _loadEuroStat = require('./loadEuroStat');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadConfig = (_LoadConfig = {}, (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.Q, _loadQuandl.loadQuandl), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.B, _implBarchart2.default), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.AL, _implAlpha2.default), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.AL_S, _implAlphaSector2.default), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.QCT, _loadQuandlCommodityTrade.loadQuandlCommodityTrade), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.EU_STAT, _loadEuroStat.loadEuroStat), (0, _defineProperty3.default)(_LoadConfig, _ChartType2.default.WATCH_LIST, _loadQuandl.loadQuandl), (0, _defineProperty3.default)(_LoadConfig, _Type.LoadType.WL, _loadQuandl.loadQuandl), _LoadConfig);

exports.default = LoadConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\LoadConfig.js.map