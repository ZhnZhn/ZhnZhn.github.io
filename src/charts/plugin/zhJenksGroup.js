import { loadJenks } from '../../math/loadMath';
import { logErrMsg } from '../../utils/asyncFn';
import { tryUpdate } from './pluginFn';

export default function(isEnabled) {
  loadJenks()
    .then(jenksModule => {
       const series = this.options.series
       , seria = series[0]
       , transformFn = isEnabled
         ? jenksModule.addJenksColorTo
         : jenksModule.removeJenksColorFrom;
       seria.data = transformFn(seria.data);
       tryUpdate(this, {
         series: [
           seria,
           ...series.slice(1)
         ]
       })
    })
    .catch(logErrMsg)
}
