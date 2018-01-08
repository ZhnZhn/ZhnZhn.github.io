'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toEarnings = require('./toEarnings');

var _toEarnings2 = _interopRequireDefault(_toEarnings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _r = {
  DF: _toEarnings2.default,
  earnings: _toEarnings2.default
};

var RouterAdapter = {
  getAdapter: function getAdapter(option) {
    var dfType = option.dfType;

    return _r[dfType] || _r.DF;
  }
};

exports.default = RouterAdapter;
//# sourceMappingURL=RouterAdapter.js.map