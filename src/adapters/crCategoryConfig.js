import pipe from '../utils/pipe';
import {
  crBarOrColumnConfig,
  fAddCaption,
  fAddSeriaBy,
  setBarConfigHeightIf,
  toConfig
} from '../charts/configBuilderFn';
import addJenksColorTo from '../math/addJenksColorTo';
import { crCategories } from './CategoryFn';

//data = [{ y, name, c}]
const crCategoryConfig = (
  title,
  subtitle,
  seriaType,
  seriaColor,
  data,
  isCluster,
  isAxisLabelsGrey
) => pipe(
  crBarOrColumnConfig(
    seriaType,
    crCategories(data),
    seriaColor,
    isAxisLabelsGrey ? void 0 : seriaColor
  ),
  fAddCaption(title, subtitle),
  fAddSeriaBy(0, {
    color: seriaColor,
    data: isCluster
      ? addJenksColorTo(data)
      : data
  }),
  setBarConfigHeightIf,
  toConfig
);

export default crCategoryConfig
