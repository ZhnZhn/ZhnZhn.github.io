'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};
var _isSupportOptions = void 0;
var onceOptions = {
  get once() {
    _isSupportOptions = true;
    return true;
  }
};

var isSupportOptions = function isSupportOptions() {
  if (!_isUndef(isSupportOptions)) {
    return _isSupportOptions;
  }
  try {
    window.addEventListener('test', onceOptions, onceOptions);
    window.removeEventListener('test', onceOptions, onceOptions);
  } catch (err) {
    _isSupportOptions = false;
  }
  return _isSupportOptions;
};

exports.default = isSupportOptions;
//# sourceMappingURL=isSupportOptions.js.map