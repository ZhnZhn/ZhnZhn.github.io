import { joinByColon } from '../utils/arrFn';

import crCategoryConfig from './crCategoryConfig';
import fToCategorySeries from './fToCategorySeries';

const crItemCaptionDf = ({
  subtitle,
  title
}) => joinByColon(subtitle, title);

const crAdapterCategory = (
  crData,
  //UNCOMTRADE, AV ETF_PROFILE (json)
  crItemCaption=crItemCaptionDf
) => {
  const adapter = {
    toConfig: (json, option) => {
      const data = crData(json, option)
      , config = crCategoryConfig(
          option.subtitle,
          option.title,
          option.seriaType,
          option.seriaColor,
          data,
          option.isAlg
      );

      //UNCOMTRADE toCategorySet generated _itemKey
      const { _itemKey } = option;
      config.zhConfig = {
        id: _itemKey,
        key: _itemKey,
        itemCaption: crItemCaption(option, json),
        itemTime: option.time,
        dataSource: option.dataSource
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
