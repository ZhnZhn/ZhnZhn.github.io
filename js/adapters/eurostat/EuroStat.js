'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EuroStatApi = require('./EuroStatApi');

var _EuroStatApi2 = _interopRequireDefault(_EuroStatApi);

var _EuroStatAdapter = require('./EuroStatAdapter');

var _EuroStatAdapter2 = _interopRequireDefault(_EuroStatAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EuroStat = { api: _EuroStatApi2.default, adapter: _EuroStatAdapter2.default };

exports.default = EuroStat;
//# sourceMappingURL=EuroStat.js.map