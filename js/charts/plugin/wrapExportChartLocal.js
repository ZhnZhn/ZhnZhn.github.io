'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapExportChartLocal = function wrapExportChartLocal(wrap, Chart) {
  wrap(Chart.prototype, 'exportChartLocal', function (fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 0) {
      _ComponentActions2.default.showCustomizeExport({ fn: fn, chart: this });
    } else {
      fn.apply(this, args);
    }
  });
};

exports.default = wrapExportChartLocal;
//# sourceMappingURL=wrapExportChartLocal.js.map