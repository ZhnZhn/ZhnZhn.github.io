
//scatter_short_form_margin_bottom
const SCATTER_SF_MB = 24
, LF_MB = 20
, SCATTER_LF_MB = 40;

const _crLongFormConfig = (marginBottom) => ({
  chart: {
    marginBottom
  },
  credits: {
    enabled: true
  }
});

const _checkIsWithScatter = chart => {
  const max = chart.series.length;
  let i=0;
  for (; i<max; i++) {
    const seria = chart.series[i];
    if (seria.visible
        && seria.options.type === 'scatter'
        && seria.options.data
        && seria.options.data.length > 0
    ) {
      return true;
    }
  }
  return false;
};

const _crShortFormConfig = (marginBottom=0) => ({
  chart: {
    spacingBottom: 0,
    marginBottom
  },
  credits: {
    enabled: false
  }
});

const WithAreaChartFn = {
  arMetricOption(chart, isShow) {
    if (!isShow) {
      return _checkIsWithScatter(chart)
        ? _crShortFormConfig(SCATTER_SF_MB)
        : _crShortFormConfig()
    } else {
      return _checkIsWithScatter(chart)
        ? _crLongFormConfig(SCATTER_LF_MB)
        : _crLongFormConfig(LF_MB)
    }
  }
};

export default WithAreaChartFn
