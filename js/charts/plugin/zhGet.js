"use strict";

exports.__esModule = true;
exports.default = void 0;
const zhGet = {
  zhGetId() {
    return this.options?.zhConfig?.id;
  },
  zhGetFromToDates(_temp) {
    let {
      seriaIndex = 0,
      format = a => a
    } = _temp === void 0 ? {} : _temp;
    try {
      const pArr = this.series?.[seriaIndex]?.points || [],
        length = pArr.length;
      return Array.isArray(pArr) && length > 0 ? {
        from: format(pArr[0].x),
        to: format(pArr[length - 1].x)
      } : {};
    } catch (err) {
      console.log(err);
      return {};
    }
  }
};
var _default = exports.default = zhGet;
//# sourceMappingURL=zhGet.js.map