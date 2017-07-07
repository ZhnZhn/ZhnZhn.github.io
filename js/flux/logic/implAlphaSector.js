'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fn = require('../../utils/fn');

var _AlphaApi = require('../../api/AlphaApi');

var _AlphaApi2 = _interopRequireDefault(_AlphaApi);

var _AlphaSectorAdapter = require('../../adapters/alpha/AlphaSectorAdapter');

var _AlphaSectorAdapter2 = _interopRequireDefault(_AlphaSectorAdapter);

var _loadItem = require('./loadItem');

var _loadItem2 = _interopRequireDefault(_loadItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadAlphaSector = (0, _loadItem2.default)({
  fnFetch: _fn.fnFetch, api: _AlphaApi2.default, adapter: _AlphaSectorAdapter2.default
});

exports.default = loadAlphaSector;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\implAlphaSector.js.map