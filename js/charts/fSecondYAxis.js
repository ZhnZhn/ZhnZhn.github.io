"use strict";

exports.__esModule = true;
exports.default = void 0;
var _chartConfigs = require("./chartConfigs");
const fSecondYAxis = (name, color) => ({
  //crosshair : fCrosshair(),
  ..._chartConfigs.YAXIS_CONFIG,
  id: name,
  lineColor: color,
  tickColor: color,
  gridLineWidth: 0,
  lineWidth: 2,
  labels: {
    style: {
      color: color,
      fontWeight: "bold",
      fontSize: "15px"
    }
  }
});
var _default = exports.default = fSecondYAxis;
//# sourceMappingURL=fSecondYAxis.js.map