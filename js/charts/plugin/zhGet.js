"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var zhGet = {
  zhGetId: function zhGetId() {
    return ((this.options || {}).zhConfig || {}).id;
  },
  zhGetFromToDates: function zhGetFromToDates(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$seriaIndex = _ref.seriaIndex,
        seriaIndex = _ref$seriaIndex === void 0 ? 0 : _ref$seriaIndex,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? function (a) {
      return a;
    } : _ref$format;

    try {
      var _this$series$seriaInd;

      var pArr = this.series && ((_this$series$seriaInd = this.series[seriaIndex]) == null ? void 0 : _this$series$seriaInd.points) || [],
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
var _default = zhGet;
exports["default"] = _default;
//# sourceMappingURL=zhGet.js.map