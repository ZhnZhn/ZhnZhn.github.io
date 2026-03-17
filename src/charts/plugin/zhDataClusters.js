import {
  JENKS,
  loadMath
} from '../../math/loadMath';
import {
  tryUpdate,
  crPlotOptions
} from './pluginFn';

const _removeColors = data => {
  data.forEach(point => {
     point.color = void 0
  })
  return data;
};

const zhDataClusters = function(isEnabled) {
  loadMath(JENKS).then(addJenksColorTo => {
    const series = this.options.series
    , seria = series[0]
    , transformFn = isEnabled
      ? addJenksColorTo
      : _removeColors;
    seria.data = transformFn(seria.data);
    tryUpdate(this, {
      series: [
        seria,
        ...series.slice(1)
      ]
    })
  }).catch(err => {
    console.log(err)
  })
};

export default zhDataClusters
