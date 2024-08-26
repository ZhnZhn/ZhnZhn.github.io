"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ComponentActions = require("../../flux/actions/ComponentActions");
const wrapExportChartLocal = (wrap, Chart) => {
  wrap(Chart.prototype, 'exportChartLocal', function (fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (args.length === 0) {
      (0, _ComponentActions.showCustomizeExport)({
        fn,
        chart: this
      });
    } else {
      fn.apply(this, args);
    }
  });
};
var _default = exports.default = wrapExportChartLocal;
//# sourceMappingURL=wrapExportChartLocal.js.map