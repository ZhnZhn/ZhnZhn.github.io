"use strict";

exports.__esModule = true;
exports["default"] = void 0;
//scatter_short_form_margin_bottom
var SCATTER_SF_MB = 24,
    LF_MB = 20,
    SCATTER_LF_MB = 40;

var _crLongFormConfig = function _crLongFormConfig(marginBottom) {
  return {
    chart: {
      marginBottom: marginBottom
    },
    credits: {
      enabled: true
    }
  };
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

var _crShortFormConfig = function _crShortFormConfig(marginBottom) {
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
      return _checkIsWithScatter(chart) ? _crShortFormConfig(SCATTER_SF_MB) : _crShortFormConfig();
    } else {
      return _checkIsWithScatter(chart) ? _crLongFormConfig(SCATTER_LF_MB) : _crLongFormConfig(LF_MB);
    }
  }
};
var _default = WithAreaChartFn;
exports["default"] = _default;
//# sourceMappingURL=WithAreaChartFn.js.map