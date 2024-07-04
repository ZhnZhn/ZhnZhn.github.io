import { joinBy } from './AdapterFn';
import { isCategoryCluster } from './CategoryFn';
import crCategoryConfig from './crCategoryConfig';
import fToCategorySeries from './fToCategorySeries';

const FN_ECHO = v => v;
const dfCrItemCaption = ({
  subtitle,
  title
}) => joinBy(': ', subtitle, title)

const crAdapterCategory = (
  crData,
  //FAOSTAT
  crTitle=FN_ECHO,
  //UNCOMTRADE
  crItemCaption=dfCrItemCaption
) => {
  const adapter = {
    toConfig: (json, option) => {
      const {
        title,
        subtitle,
        seriaType,
        seriaColor,
        time,
        dataSource
      } = option
      , data = crData(json, option)
      , _arrSeriaType = seriaType.split('_')
      , config = crCategoryConfig(
          crTitle(subtitle, json),
          title,
          _arrSeriaType[0],
          seriaColor,
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
