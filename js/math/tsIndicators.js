'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sma = require('./sma');

var _sma2 = _interopRequireDefault(_sma);

var _mfi = require('./mfi');

var _mfi2 = _interopRequireDefault(_mfi);

var _momAth = require('./momAth');

var _momAth2 = _interopRequireDefault(_momAth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tsIndicators = {
  sma: _sma2.default, mfi: _mfi2.default, momAth: _momAth2.default
};

exports.default = tsIndicators;
//# sourceMappingURL=tsIndicators.js.map