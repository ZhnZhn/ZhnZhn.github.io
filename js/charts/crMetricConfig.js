"use strict";

exports.__esModule = true;
exports.default = void 0;
//scatter_short_form_margin_bottom
const SCATTER_SF_MB = 24,
      LF_MB = 20,
      SCATTER_LF_MB = 40;

const _checkIsWithScatter = chart => {
  for (let i = 0; i < chart.series.length; i++) {
    const seria = chart.series[i],
          {
      options
    } = seria;

    if (seria.visible && options.type === 'scatter' && options.data && options.data.length > 0) {
      return true;
    }
  }

  return false;
};

const _crLongFormConfig = marginBottom => ({
  chart: {
    marginBottom
  },
  credits: {
    enabled: true
  }
});

const _crShortFormConfig = marginBottom => ({
  chart: {
    spacingBottom: 0,
    marginBottom
  },
  credits: {
    enabled: false
  }
});

const crMetricConfig = (chart, isShow) => {
  const _isScatter = _checkIsWithScatter(chart);

  return isShow ? _crLongFormConfig(_isScatter ? SCATTER_LF_MB : LF_MB) : _crShortFormConfig(_isScatter ? SCATTER_SF_MB : 0);
};

var _default = crMetricConfig;
exports.default = _default;
//# sourceMappingURL=crMetricConfig.js.map