import toSpline from './toSpline';
import toAreaYearly from './toAreaYearly'
import {
  crCategoryConfig,
  crCategorySeria
} from './toCategory'
import toMap from './toMap';

const DF_TYPE = 'SPLINE';
const _rToConfig = {
  AREA: toSpline.createConfig,
  SPLINE: toSpline.createConfig,
  COLUMN: toSpline.createConfig,
  AREA_YEARLY: toAreaYearly.createConfig,
  MAP: toMap.createConfig,
  COLUMN_SET: crCategoryConfig,
  BAR_SET: crCategoryConfig,
  BAR_WITH_LABELS: crCategoryConfig,
  DOT_SET: crCategoryConfig
};

const _rToSeria = {
  AREA: toSpline.createSeria,
  SPLINE: toSpline.createSeria,
  COLUMN: toSpline.createSeria,
  COLUMN_SET: crCategorySeria,
  BAR_SET: crCategorySeria,
  BAR_WITH_LABELS: crCategorySeria,
  DOT_SET: crCategorySeria
};

const _checkSeriaType = (
  router,
  option,
  dfType=DF_TYPE
) => {
  if (!option.seriaType || !router[option.seriaType]) {
    option.seriaType = dfType
  }
};

const EuroStatAdapter = {
  toConfig(json, option){
    _checkSeriaType(_rToConfig, option)
    const {
      seriaType,
      zhCompType
    } = option
    , fnToConfig = _rToConfig[seriaType]
    , config = fnToConfig
       ? fnToConfig(json, option)
       : {} ;

    config.zhCompType = zhCompType
    return { config };
 },

  toSeries(json, option, chart){
    _checkSeriaType(_rToConfig, option)
    const { seriaType } = option
    , fnToSeria = _rToSeria[seriaType]
    , seria = fnToSeria
       ? fnToSeria(json, option, chart)
       : void 0;
    return seria;
  }
}

export default EuroStatAdapter
