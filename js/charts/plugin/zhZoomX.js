"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var zhZoomX = function zhZoomX(_ref) {
  var _ref$seriaIndex = _ref.seriaIndex,
      seriaIndex = _ref$seriaIndex === undefined ? 0 : _ref$seriaIndex,
      from = _ref.from,
      to = _ref.to;

  try {
    var xAxis = this.xAxis[seriaIndex];
    if (xAxis) {
      xAxis.setExtremes(from, to);
      if (!this.resetZoomButton) {
        this.showResetZoom();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.default = zhZoomX;
//# sourceMappingURL=zhZoomX.js.map