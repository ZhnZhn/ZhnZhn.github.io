'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toHdConfig = require('./toHdConfig');

var _toHdConfig2 = _interopRequireDefault(_toHdConfig);

var _toInfoConfig = require('./toInfoConfig');

var _toInfoConfig2 = _interopRequireDefault(_toInfoConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rAdapter = {
  DF: _toHdConfig2.default,
  HD: _toHdConfig2.default,
  CI: _toInfoConfig2.default
};

var _getAdapter = function _getAdapter(option) {
  var dfSubLoadId = option.dfSubLoadId;

  return _rAdapter[dfSubLoadId] || _rAdapter.DF;
};

var CrcAdapter = {
  toConfig: function toConfig(json, option) {
    return _getAdapter(option).toConfig(json, option);
  },
  toSeries: function toSeries(json, option) {
    return _getAdapter(option).toSeries(json, option);
  }
};

exports.default = CrcAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\crypto-compare\CrcAdapter.js.map