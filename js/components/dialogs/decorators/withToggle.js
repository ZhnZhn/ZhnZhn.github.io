"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _toggleStateByWithToggle = function _toggleStateByWithToggle(propName) {
  this.setState(function (prevState) {
    var _ref;

    return _ref = {}, _ref[propName] = !prevState[propName], _ref;
  });
};

var withToggle = function withToggle(target) {
  if (!target.prototype._toggleStateByWithToggle) {
    Object.assign(target.prototype, {
      _toggleStateByWithToggle: _toggleStateByWithToggle
    });
  }
};

var _default = withToggle;
exports["default"] = _default;
//# sourceMappingURL=withToggle.js.map