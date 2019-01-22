"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toggleStateByWithToggle = function _toggleStateByWithToggle(propName) {
  this.setState(function (prevState) {
    return (0, _defineProperty3.default)({}, propName, !prevState[propName]);
  });
};

var withToggle = function withToggle(target) {
  if (!target.prototype._toggleStateByWithToggle) {
    Object.assign(target.prototype, {
      _toggleStateByWithToggle: _toggleStateByWithToggle
    });
  }
};

exports.default = withToggle;
//# sourceMappingURL=withToggle.js.map