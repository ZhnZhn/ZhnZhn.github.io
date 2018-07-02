'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throttle = require('./throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_WAIT = 800;
var throttleOnce = function throttleOnce(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DF_WAIT;
  return (0, _throttle2.default)(fn, wait, { trailing: false });
};

exports.default = throttleOnce;
//# sourceMappingURL=throttleOnce.js.map