import addJenksColorTo from '../math/addJenksColorTo';
import Builder from '../charts/ConfigBuilder';

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
) => Builder()
  .barOrColumnConfig(seriaType, _crCategories(data))
  .addCaption(title, subtitle)
  .addSeriaBy(0, {
    color: seriaColor,
    data: isCluster ? addJenksColorTo(data) : data
  })
  .toConfig();

export default crCategoryConfig
