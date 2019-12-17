"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var CHANNEL = 'WITH_LIMIT_REMAINING';
var WithLimitRemaining = {
  listenLimitRemaining: function listenLimitRemaining(fnHandler) {
    var _this = this;

    this.emitter.addListener(CHANNEL, fnHandler);
    return function () {
      _this.emitter.removeListener(CHANNEL, fnHandler);
    };
  },
  triggerLimitRemaining: function triggerLimitRemaining(limitRemaining) {
    this.emitter.emit(CHANNEL, limitRemaining);
  }
};
var _default = WithLimitRemaining;
exports["default"] = _default;
//# sourceMappingURL=WithLimitRemaining.js.map