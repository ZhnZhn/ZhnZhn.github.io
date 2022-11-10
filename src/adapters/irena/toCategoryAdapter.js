import { isCategoryCluster } from '../CategoryFn';
import crCategoryConfig from '../crCategoryConfig';
import fToCategorySeries from '../fToCategorySeries';

const _crData = (
  json
) => json.data.map(arrP => ({
  y: arrP[1],
  name: arrP[0],
  c: arrP[0]
}))

const toCategoryAdapter = {
  toConfig: (json, option) => {
    const {
      title,
      subtitle,
      seriaType,
      seriaColor,
      _itemKey,
      time,
      dataSource
    } = option
    , data = _crData(json)
    , _arrSeriaType = seriaType.split('_')
    , config = crCategoryConfig(
        subtitle,
        title,
        _arrSeriaType[0],
        seriaColor,
        data,
        isCategoryCluster(seriaType)
    );

    config.zhConfig = {
      id: _itemKey,
      key: _itemKey,
      itemCaption: `${subtitle}: ${title}`,
      itemTime: time,
      dataSource
    }
    return { config };
  }
}

toCategoryAdapter.toSeries = fToCategorySeries(
  toCategoryAdapter.toConfig
)

export default toCategoryAdapter
