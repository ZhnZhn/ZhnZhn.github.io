import pipe from '../utils/pipe';
import {
  crBarOrColumnConfig,
  fAddCaption,
  fAddSeriaBy,
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
  isCluster
) => pipe(
  crBarOrColumnConfig(seriaType, crCategories(data)),
  fAddCaption(title, subtitle),
  fAddSeriaBy(0, {
    color: seriaColor,
    data: isCluster
      ? addJenksColorTo(data)
      : data
  }),
  toConfig
);

export default crCategoryConfig
