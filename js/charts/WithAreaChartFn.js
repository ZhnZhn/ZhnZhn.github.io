"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var CHART = {
  SCATTER_MARGIN_BOTTOM: 24,
  LONG_FORM: {
    chart: {
      marginBottom: 40
    },
    credits: {
      enabled: true
    }
  }
};

var _checkIsWithScatter = function _checkIsWithScatter(chart) {
  var max = chart.series.length;
  var i = 0;

  for (; i < max; i++) {
    var seria = chart.series[i];

    if (seria.visible && seria.options.type === 'scatter' && seria.options.data && seria.options.data.length > 0) {
      return true;
    }
  }

  return false;
};

var _fOptionShortForm = function _fOptionShortForm(marginBottom) {
  if (marginBottom === void 0) {
    marginBottom = 0;
  }

  return {
    chart: {
      spacingBottom: 0,
      marginBottom: marginBottom
    },
    credits: {
      enabled: false
    }
  };
};

var WithAreaChartFn = {
  arMetricOption: function arMetricOption(chart, isShow) {
    if (!isShow) {
      if (!_checkIsWithScatter(chart)) {
        return _fOptionShortForm();
      } else {
        return _fOptionShortForm(CHART.SCATTER_MARGIN_BOTTOM);
      }
    } else {
      return CHART.LONG_FORM;
    }
  }
};
var _default = WithAreaChartFn;
exports["default"] = _default;
//# sourceMappingURL=WithAreaChartFn.js.map