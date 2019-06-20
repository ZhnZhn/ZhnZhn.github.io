'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WdtApi = require('./WdtApi');

var _WdtApi2 = _interopRequireDefault(_WdtApi);

var _WtdAdapter = require('./WtdAdapter');

var _WtdAdapter2 = _interopRequireDefault(_WtdAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wdt = {
  api: _WdtApi2.default,
  adapter: _WtdAdapter2.default
};

exports.default = Wdt;
//# sourceMappingURL=Wtd.js.map