"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _setStateByWithSet = function _setStateByWithSet(propName, value) {
  this.setState((0, _defineProperty3.default)({}, propName, value));
};

var withSet = function withSet(target) {
  if (!target.prototype._setStateByWithSet) {
    Object.assign(target.prototype, {
      _setStateByWithSet: _setStateByWithSet
    });
  }
};

exports.default = withSet;
//# sourceMappingURL=withSet.js.map