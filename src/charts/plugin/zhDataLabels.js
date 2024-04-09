import { crCategoryDataLabels } from '../Chart';
import {
  getSeriaType,
  tryUpdate
} from './pluginFn';

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

const zhDataLabels = function(isEnabled) {
  tryUpdate(
    this,
    _crDataLabels(
       getSeriaType(this),
       crCategoryDataLabels(isEnabled)
     )
  )
};

export default zhDataLabels
