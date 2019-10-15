'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has = require('../../has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isWithInitialState = function _isWithInitialState() {
  var _isWideWidth = _has2.default.wideWidth();
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

exports.default = withInitialState;
//# sourceMappingURL=withInitialState.js.map