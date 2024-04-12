import { crCategoryDataLabels } from '../Chart';
import {  
  tryUpdate,
  crPlotOptions
} from './pluginFn';

const zhDataLabels = function(isEnabled) {
  tryUpdate(
    this,
    crPlotOptions(
      this,
      "dataLabels",
      crCategoryDataLabels(isEnabled)
    )
  )
};

export default zhDataLabels
