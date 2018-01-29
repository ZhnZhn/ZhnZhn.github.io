'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CmcApi = require('./CmcApi');

var _CmcApi2 = _interopRequireDefault(_CmcApi);

var _CmcAdapter = require('./CmcAdapter');

var _CmcAdapter2 = _interopRequireDefault(_CmcAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cmc = {
  api: _CmcApi2.default, adapter: _CmcAdapter2.default
};

exports.default = Cmc;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\coin-market-cap\Cmc.js.map