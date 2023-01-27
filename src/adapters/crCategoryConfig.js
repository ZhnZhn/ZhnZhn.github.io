import pipe from '../utils/pipe';
import {
  crBarOrColumnConfig,
  fAddCaption,
  fAddSeriaBy,
  toConfig
} from '../charts/configBuilderFn';
import addJenksColorTo from '../math/addJenksColorTo';


const _crCategories = (
  data
) => data.map(item => item.c);

//data = [{ y, name, c}]
const crCategoryConfig = (
  title,
  subtitle,
  seriaType,
  seriaColor,
  data,
  isCluster
) => pipe(
  crBarOrColumnConfig(seriaType, _crCategories(data)),
  fAddCaption(title, subtitle),
  fAddSeriaBy(0, {
    color: seriaColor,
    data: isCluster ? addJenksColorTo(data) : data
  }),
  toConfig
);

export default crCategoryConfig
