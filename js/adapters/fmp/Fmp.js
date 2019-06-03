'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FmpApi = require('./FmpApi');

var _FmpApi2 = _interopRequireDefault(_FmpApi);

var _FmpAdapter = require('./FmpAdapter');

var _FmpAdapter2 = _interopRequireDefault(_FmpAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fmp = {
  api: _FmpApi2.default,
  adapter: _FmpAdapter2.default
};

exports.default = Fmp;
//# sourceMappingURL=Fmp.js.map