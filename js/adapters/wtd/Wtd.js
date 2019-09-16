'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WtdApi = require('./WtdApi');

var _WtdApi2 = _interopRequireDefault(_WtdApi);

var _WtdAdapter = require('./WtdAdapter');

var _WtdAdapter2 = _interopRequireDefault(_WtdAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wtd = {
  api: _WtdApi2.default,
  adapter: _WtdAdapter2.default
};

exports.default = Wtd;
//# sourceMappingURL=Wtd.js.map