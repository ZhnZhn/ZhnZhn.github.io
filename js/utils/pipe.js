'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pipe = function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  if (fns.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return _compose2.default.apply(undefined, (0, _toConsumableArray3.default)(fns.slice().reverse()));
};

exports.default = pipe;
//# sourceMappingURL=pipe.js.map