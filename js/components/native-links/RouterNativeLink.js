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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouterNativeLink = {
  QUANDL: _QuandlLink2.default,
  EURONEXT: _EuronextLink2.default,
  NASDAQ: _NasdaqLink2.default
};

exports.default = RouterNativeLink;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\native-links\RouterNativeLink.js.map