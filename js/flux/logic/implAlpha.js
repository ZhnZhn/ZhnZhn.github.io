'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fn = require('../../utils/fn');

var _AlphaApi = require('../../api/AlphaApi');

var _AlphaApi2 = _interopRequireDefault(_AlphaApi);

var _AlphaAdapter = require('../../adapters/alpha/AlphaAdapter');

var _AlphaAdapter2 = _interopRequireDefault(_AlphaAdapter);

var _loadItem = require('./loadItem');

var _loadItem2 = _interopRequireDefault(_loadItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadAlpha = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch,
  api: _AlphaApi2.default,
  adapter: _AlphaAdapter2.default
});

exports.default = loadAlpha;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\implAlpha.js.map