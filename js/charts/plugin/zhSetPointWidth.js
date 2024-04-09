"use strict";

exports.__esModule = true;
exports.default = void 0;
var _pluginFn = require("./pluginFn");
const zhSetPointWidth = function (pointWidth) {
  (0, _pluginFn.tryUpdate)(this, {
    plotOptions: {
      [(0, _pluginFn.getSeriaType)(this)]: {
        pointWidth
      }
    }
  });
};
var _default = exports.default = zhSetPointWidth;
//# sourceMappingURL=zhSetPointWidth.js.map