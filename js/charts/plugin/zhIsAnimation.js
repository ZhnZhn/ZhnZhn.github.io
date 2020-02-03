"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var zhIsAnimation = function zhIsAnimation() {
  return ((this.userOptions || {}).zhConfig || {}).withoutAnimation ? false : true;
};

var _default = zhIsAnimation;
exports["default"] = _default;
//# sourceMappingURL=zhIsAnimation.js.map