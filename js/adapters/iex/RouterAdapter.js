'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toEarnings = require('./toEarnings');

var _toEarnings2 = _interopRequireDefault(_toEarnings);

var _toChart = require('./toChart');

var _toChart2 = _interopRequireDefault(_toChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _r = {
  DF: _toChart2.default,
  earnings: _toEarnings2.default,
  chart: _toChart2.default
};

var RouterAdapter = {
  getAdapter: function getAdapter(option) {
    var dfType = option.dfType;

    return _r[dfType] || _r.DF;
  }
};

exports.default = RouterAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\iex\RouterAdapter.js.map