'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BarchartApi = require('./BarchartApi');

var _BarchartApi2 = _interopRequireDefault(_BarchartApi);

var _BarchartAdapter = require('./BarchartAdapter');

var _BarchartAdapter2 = _interopRequireDefault(_BarchartAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Barchart = {
  optionFetch: {
    jsonpCallbackFunction: 'BarchartAPIcallback'
  },
  api: _BarchartApi2.default, adapter: _BarchartAdapter2.default
};

exports.default = Barchart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\barchart\Barchart.js.map