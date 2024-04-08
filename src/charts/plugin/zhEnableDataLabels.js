import { getColorBlack } from '../ChartFn';

const _crDataLabelsConfig = (isEnabled) => ({
  enabled: isEnabled,
  color: getColorBlack(),
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
});

const _crDataLabels = (
  seriaType,
  dataLabels
) => ({
  plotOptions: {
    [seriaType]: {
      dataLabels
    }
  }
});

const _tryUpdate = (inst, options) => {
  try {
    inst.update(options)
  } catch(err) {
    console.log(err)
  }
};

const _getSeriaType = (
  chartInst
) => chartInst.options.chart.type;

const _fDataLabels = (
  isEnabled
) => function(seriaType) {
  _tryUpdate(
    this,
    _crDataLabels(
      seriaType || _getSeriaType(this),
      _crDataLabelsConfig(isEnabled)
    )
  )
};

export const zhEnableDataLabels = _fDataLabels(true)
export const zhDisableDataLabels = _fDataLabels(false)
