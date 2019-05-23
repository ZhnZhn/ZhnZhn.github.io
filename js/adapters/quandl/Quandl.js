'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _QuandlApi = require('./QuandlApi');

var _QuandlApi2 = _interopRequireDefault(_QuandlApi);

var _QuandlAdapter = require('./QuandlAdapter');

var _QuandlAdapter2 = _interopRequireDefault(_QuandlAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quandl = {
  id: 'Q',
  api: _QuandlApi2.default, adapter: _QuandlAdapter2.default
};

exports.default = Quandl;
//# sourceMappingURL=Quandl.js.map