'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IntrinioApi = require('./IntrinioApi');

var _IntrinioApi2 = _interopRequireDefault(_IntrinioApi);

var _IntrinioAdapter = require('./IntrinioAdapter');

var _IntrinioAdapter2 = _interopRequireDefault(_IntrinioAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Intrinio = {
  optionFetch: _IntrinioApi2.default.crOptionFetch,
  api: _IntrinioApi2.default,
  adapter: _IntrinioAdapter2.default
};

exports.default = Intrinio;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\intrinio\Intrinio.js.map