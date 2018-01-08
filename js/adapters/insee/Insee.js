'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InseeApi = require('./InseeApi');

var _InseeApi2 = _interopRequireDefault(_InseeApi);

var _InseeAdapter = require('./InseeAdapter');

var _InseeAdapter2 = _interopRequireDefault(_InseeAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Insee = { api: _InseeApi2.default, adapter: _InseeAdapter2.default };

exports.default = Insee;
//# sourceMappingURL=Insee.js.map