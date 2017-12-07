'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FaoStatApi = require('./FaoStatApi');

var _FaoStatApi2 = _interopRequireDefault(_FaoStatApi);

var _FaoStatAdapter = require('./FaoStatAdapter');

var _FaoStatAdapter2 = _interopRequireDefault(_FaoStatAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FaoStat = { api: _FaoStatApi2.default, adapter: _FaoStatAdapter2.default };

exports.default = FaoStat;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\faostat\FaoStat.js.map