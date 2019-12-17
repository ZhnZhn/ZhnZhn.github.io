"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _setStateByWithSet = function _setStateByWithSet(propName, value) {
  var _this$setState;

  this.setState((_this$setState = {}, _this$setState[propName] = value, _this$setState));
};

var withSet = function withSet(target) {
  if (!target.prototype._setStateByWithSet) {
    Object.assign(target.prototype, {
      _setStateByWithSet: _setStateByWithSet
    });
  }
};

var _default = withSet;
exports["default"] = _default;
//# sourceMappingURL=withSet.js.map