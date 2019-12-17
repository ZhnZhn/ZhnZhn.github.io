"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var _isSupportOptions;

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

var _default = isSupportOptions;
exports["default"] = _default;
//# sourceMappingURL=isSupportOptions.js.map