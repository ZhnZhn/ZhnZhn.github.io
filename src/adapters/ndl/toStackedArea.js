import { CHT_STACKED_AREA_PERCENT } from '../../constants/ChartType';
import { crConfig } from './fnStacked';

const toStackedArea = (
  json,
  option
) => crConfig({
  percentType: CHT_STACKED_AREA_PERCENT,
  json,
  option
});

export default toStackedArea
