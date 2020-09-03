import { ChartType } from '../../constants/Type';
import fnStacked from './fnStacked'

const { crConfig } = fnStacked;

const toStackedArea = (json, option) => crConfig({
  percentType: ChartType.STACKED_AREA_PERCENT,
  json, option
});

export default toStackedArea
