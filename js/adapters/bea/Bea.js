'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BeaApi = require('./BeaApi');

var _BeaApi2 = _interopRequireDefault(_BeaApi);

var _BeaAdapter = require('./BeaAdapter');

var _BeaAdapter2 = _interopRequireDefault(_BeaAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bea = {
  api: _BeaApi2.default, adapter: _BeaAdapter2.default
};

exports.default = Bea;
//# sourceMappingURL=Bea.js.map