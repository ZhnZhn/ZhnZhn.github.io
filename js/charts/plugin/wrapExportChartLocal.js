'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppAction = require('../../flux/actions/AppAction');

var wrapExportChartLocal = function wrapExportChartLocal(wrap, Chart) {
  wrap(Chart.prototype, 'exportChartLocal', function (fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 0) {
      (0, _AppAction.showCustomizeExportDialog)({ fn: fn, chart: this });
    } else {
      fn.apply(this, args);
    }
  });
};

exports.default = wrapExportChartLocal;
//# sourceMappingURL=wrapExportChartLocal.js.map