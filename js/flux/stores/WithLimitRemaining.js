'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANNEL = 'WITH_LIMIT_REMAINING',
    UNKNOWN = 'Unknown';

var WithLimitRemaining = {
  listenWithLimitRemaining: function listenWithLimitRemaining(fnHandler) {
    var _this = this;

    this.emitter.addListener(CHANNEL, fnHandler);
    return function () {
      _this.emitter.removeListener(CHANNEL, fnHandler);
    };
  },
  triggerWithLimitRemaining: function triggerWithLimitRemaining(limitRemaining) {
    if (limitRemaining == null) {
      limitRemaining = UNKNOWN;
    }
    this.emitter.emit(CHANNEL, limitRemaining);
  }
};

exports.default = WithLimitRemaining;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\WithLimitRemaining.js.map