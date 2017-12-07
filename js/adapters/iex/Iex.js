'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IexApi = require('./IexApi');

var _IexApi2 = _interopRequireDefault(_IexApi);

var _IexAdapter = require('./IexAdapter');

var _IexAdapter2 = _interopRequireDefault(_IexAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Iex = { api: _IexApi2.default, adapter: _IexAdapter2.default };

exports.default = Iex;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\iex\Iex.js.map