"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var zhGetFromToDates = function zhGetFromToDates(_ref) {
  var _ref$seriaIndex = _ref.seriaIndex,
      seriaIndex = _ref$seriaIndex === undefined ? 0 : _ref$seriaIndex,
      _ref$format = _ref.format,
      format = _ref$format === undefined ? function (a) {
    return a;
  } : _ref$format;

  try {
    var pArr = this.series && this.series[seriaIndex].points || [],
        length = pArr.length;
    return Array.isArray(pArr) && length > 0 ? {
      from: format(pArr[0].x),
      to: format(pArr[length - 1].x)
    } : {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

exports.default = zhGetFromToDates;
//# sourceMappingURL=zhGetFromToDates.js.map