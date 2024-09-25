import { joinBy } from './AdapterFn';
import { isCategoryCluster } from './CategoryFn';
import crCategoryConfig from './crCategoryConfig';
import fToCategorySeries from './fToCategorySeries';

const crItemCaptionDf = ({
  subtitle,
  title
}) => joinBy(': ', subtitle, title);

const crAdapterCategory = (
  crData,
  //UNCOMTRADE
  crItemCaption=crItemCaptionDf
) => {
  const adapter = {
    toConfig: (json, option) => {
      const {
        seriaType,
        dataSource
      } = option
      , data = crData(json, option)
      , _arrSeriaType = seriaType.split('_')
      , config = crCategoryConfig(
          option.subtitle,
          option.title,
          _arrSeriaType[0],
          option.seriaColor,
          data,
          isCategoryCluster(seriaType),
          option.isAlg
      );

      //UNCOMTRADE toCategorySet generated _itemKey
      const { _itemKey } = option;
      config.zhConfig = {
        id: _itemKey,
        key: _itemKey,
        itemCaption: crItemCaption(option),
        itemTime: option.time,
        dataSource
      }
      return { config };
    }
  }

  adapter.toSeries = fToCategorySeries(
    adapter.toConfig
  )
  return adapter;
};

export default crAdapterCategory
