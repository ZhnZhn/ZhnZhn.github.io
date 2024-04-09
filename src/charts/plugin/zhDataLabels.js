import { crCategoryDataLabels } from '../Chart';

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


const zhDataLabels = function(isEnabled) {
  _tryUpdate(
    this,
    _crDataLabels(
       _getSeriaType(this),
       crCategoryDataLabels(isEnabled)
     )
  )
};

export default zhDataLabels
