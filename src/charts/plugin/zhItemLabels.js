import { crCategoryDataLabels } from '../Chart';
import {
  tryUpdate,
  crPlotOptions
} from './pluginFn';

export default function(isEnabled) {
  tryUpdate(
    this,
    crPlotOptions(
      this,
      "dataLabels",
      crCategoryDataLabels(isEnabled)
    )
  )
}
