import { joinBy } from './AdapterFn';
import { isCategoryCluster } from './CategoryFn';
import crCategoryConfig from './crCategoryConfig';
import fToCategorySeries from './fToCategorySeries';

const crAdapterCategory = (
  crData
) => {
  const adapter = {
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
      , data = crData(json, option)
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
        itemCaption: joinBy(': ', subtitle, title),
        itemTime: time,
        dataSource
      }
      return { config };
    }
  }

  adapter.toSeries = fToCategorySeries(
    adapter.toConfig
  )
  return adapter;
}

export default crAdapterCategory
