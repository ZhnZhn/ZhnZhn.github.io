'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _QuandlLink = require('./QuandlLink');

var _QuandlLink2 = _interopRequireDefault(_QuandlLink);

var _EuronextLink = require('./EuronextLink');

var _EuronextLink2 = _interopRequireDefault(_EuronextLink);

var _NasdaqLink = require('./NasdaqLink');

var _NasdaqLink2 = _interopRequireDefault(_NasdaqLink);

var _LmeLink = require('./LmeLink');

var _LmeLink2 = _interopRequireDefault(_LmeLink);

var _UnComtradeLink = require('./UnComtradeLink');

var _UnComtradeLink2 = _interopRequireDefault(_UnComtradeLink);

var _FaoStatLink = require('./FaoStatLink');

var _FaoStatLink2 = _interopRequireDefault(_FaoStatLink);

var _FredLink = require('./FredLink');

var _FredLink2 = _interopRequireDefault(_FredLink);

var _BslLink = require('./BslLink');

var _BslLink2 = _interopRequireDefault(_BslLink);

var _CrcLink = require('./CrcLink');

var _CrcLink2 = _interopRequireDefault(_CrcLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterNativeLink = {
  QUANDL: _QuandlLink2.default,
  EURONEXT: _EuronextLink2.default,
  NASDAQ: _NasdaqLink2.default,
  LME: _LmeLink2.default,
  UN_COMTRADE: _UnComtradeLink2.default,
  FAO_STAT: _FaoStatLink2.default,
  FRED: _FredLink2.default,
  BSL: _BslLink2.default,
  CRC: _CrcLink2.default
};

exports.default = RouterNativeLink;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\native-links\RouterNativeLink.js.map