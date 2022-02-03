//scatter_long_form_margin_bottom
const SCATTER_LF_MB = 40
, SCATTER_SF_MB = 24
, LF_MB = 20
, SF_MB = 0;

const _checkIsWithScatter = chartIns => {
  const { series } = chartIns;
  for (let i=0; i<series.length; i++) {
    const seria = series[i]
    , { options } = seria;
    if (seria.visible
        && options
        && options.type === 'scatter'
        && options.data
        && options.data.length > 0
    ) {
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

const _crLongFormMb = chartIns => {
  const { chart } = chartIns.userOptions
  , { marginBottom } = chart || {};
  return marginBottom || LF_MB;
};

const  crSpacingConfig = (chartIns, isShow) => {
  const _isScatter = _checkIsWithScatter(chartIns);
  return isShow
    ? _crLongFormConfig(_isScatter ? SCATTER_LF_MB : _crLongFormMb(chartIns))
    : _crShortFormConfig(_isScatter ? SCATTER_SF_MB : SF_MB);
};

export default crSpacingConfig
