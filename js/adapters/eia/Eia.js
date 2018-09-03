'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EiaApi = require('./EiaApi');

var _EiaApi2 = _interopRequireDefault(_EiaApi);

var _EiaAdapter = require('./EiaAdapter');

var _EiaAdapter2 = _interopRequireDefault(_EiaAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Eia = {
  api: _EiaApi2.default, adapter: _EiaAdapter2.default
};

exports.default = Eia;
//# sourceMappingURL=Eia.js.map