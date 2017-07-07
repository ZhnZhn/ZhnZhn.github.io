'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fnJsonp = require('../../utils/fnJsonp');

var _BarchartApi = require('../../api/BarchartApi');

var _BarchartApi2 = _interopRequireDefault(_BarchartApi);

var _BarchartAdapter = require('../../adapters/barchart/BarchartAdapter');

var _BarchartAdapter2 = _interopRequireDefault(_BarchartAdapter);

var _loadItem = require('./loadItem');

var _loadItem2 = _interopRequireDefault(_loadItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadBarchart = (0, _loadItem2.default)({
  fnFetch: _fnJsonp.fnFetch,
  api: _BarchartApi2.default,
  adapter: _BarchartAdapter2.default
});

exports.default = loadBarchart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\logic\implBarchart.js.map