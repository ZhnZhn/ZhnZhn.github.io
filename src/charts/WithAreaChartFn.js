
const CHART = {
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

const _fOptionShortForm = (marginBottom=0) => {
  return {
    chart: {
      spacingBottom: 0,
      marginBottom
    },
    credits: {
      enabled: false
    }
  };
};

const WithAreaChartFn = {

  arMetricOption(chart, isShow) {
    if (!isShow) {
      if ( !_checkIsWithScatter(chart) ) {
        return _fOptionShortForm();
      } else {
        return _fOptionShortForm(CHART.SCATTER_MARGIN_BOTTOM);
      }
    } else {
      return CHART.LONG_FORM;
    }
  }
};

export default WithAreaChartFn
