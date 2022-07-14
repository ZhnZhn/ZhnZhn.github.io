"use strict";

exports.__esModule = true;
exports.default = void 0;
const DF_PERIOD = 800;

const _getNowTime = Date.now || (() => new Date.getTime());

const throttleFn = function (fn, period) {
  if (period === void 0) {
    period = DF_PERIOD;
  }

  let prevTime = 0;
  return function throttled() {
    const nowTime = _getNowTime();

    if (nowTime - prevTime > period) {
      prevTime = nowTime;
      return fn(...arguments);
    }
  };
};

var _default = throttleFn;
exports.default = _default;
//# sourceMappingURL=throttleFn.js.map