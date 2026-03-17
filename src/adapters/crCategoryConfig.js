import pipe from '../utils/pipe';
import {
  crBarOrColumnConfig,
  fAddCaption,
  fAddSeriaBy,
  setBarConfigHeightIf,
  toConfig
} from '../charts/configBuilderFn';

import {
  crCategories
} from './CategoryFn';

//data = [{ y, name, c}]
const crCategoryConfig = (
  title,
  subtitle,
  seriaType,
  seriaColor,
  data,
  isAxisLabelsGrey
) => pipe(
  crBarOrColumnConfig(
    (seriaType || '').split('_')[0],
    crCategories(data),
    seriaColor,
    isAxisLabelsGrey ? void 0 : seriaColor
  ),
  fAddCaption(title, subtitle),
  fAddSeriaBy(0, {
    color: seriaColor,
    data,    
  }),
  setBarConfigHeightIf,
  toConfig
);

export default crCategoryConfig
