"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var zhZoomX = function zhZoomX(_ref) {
  var _ref$seriaIndex = _ref.seriaIndex,
      seriaIndex = _ref$seriaIndex === void 0 ? 0 : _ref$seriaIndex,
      from = _ref.from,
      to = _ref.to;

  try {
    var xAxis = this.xAxis[seriaIndex];

    if (xAxis && from <= to) {
      xAxis.setExtremes(from, to);

      if (!this.resetZoomButton) {
        this.showResetZoom();
      }

      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

var _default = zhZoomX;
exports["default"] = _default;
//# sourceMappingURL=zhZoomX.js.map