'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AlphaApi = require('./AlphaApi');

var _AlphaApi2 = _interopRequireDefault(_AlphaApi);

var _BarchartApi = require('./BarchartApi');

var _BarchartApi2 = _interopRequireDefault(_BarchartApi);

var _EuroStatApi = require('./EuroStatApi');

var _EuroStatApi2 = _interopRequireDefault(_EuroStatApi);

var _QuandlApi = require('./QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _UnComtradeApi = require('./UnComtradeApi');

var _UnComtradeApi2 = _interopRequireDefault(_UnComtradeApi);

var _FaoStatApi = require('./FaoStatApi');

var _FaoStatApi2 = _interopRequireDefault(_FaoStatApi);

var _InseeApi = require('./InseeApi');

var _InseeApi2 = _interopRequireDefault(_InseeApi);

var _StatNorwayApi = require('./StatNorwayApi');

var _StatNorwayApi2 = _interopRequireDefault(_StatNorwayApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Alpha: _AlphaApi2.default, Barchart: _BarchartApi2.default, Quandl: _QuandlApi2.default,
  UnComtrade: _UnComtradeApi2.default, FaoStat: _FaoStatApi2.default,
  Insee: _InseeApi2.default, EuroStat: _EuroStatApi2.default, StatNorway: _StatNorwayApi2.default
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\Api.js.map