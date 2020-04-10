"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isBool = function _isBool(v) {
  return typeof v === 'boolean';
};

var _isSupportOptions;

var onceOptions = {
  get once() {
    _isSupportOptions = true;
    return true;
  }

};

var isSupportOptions = function isSupportOptions() {
  if (_isBool(_isSupportOptions)) {
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