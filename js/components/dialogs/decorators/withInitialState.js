"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _has = _interopRequireDefault(require("../../has"));

var _isWithInitialState = function _isWithInitialState() {
  var _isWideWidth = _has["default"].wideWidth();

  return {
    isToolbar: true,
    isShowLabels: _isWideWidth,
    isShowDate: _isWideWidth,
    validationMessages: []
  };
};

var withInitialState = function withInitialState(target) {
  Object.assign(target.prototype, {
    _isWithInitialState: _isWithInitialState
  });
};

var _default = withInitialState;
exports["default"] = _default;
//# sourceMappingURL=withInitialState.js.map