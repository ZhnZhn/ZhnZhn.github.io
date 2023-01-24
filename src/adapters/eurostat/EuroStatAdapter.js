import {
  crSplineConfig,
  crSplineSeria
} from './toSpline';
import {
  crAreaYearlyConfig
} from './toAreaYearly';
import {
  crCategoryConfig,
  crCategorySeria
} from './toCategory'
import {
  crMapConfig
} from './toMap';

const DF_TYPE = 'SPLINE';
const _rToConfig = {
  AREA: crSplineConfig,
  SPLINE: crSplineConfig,
  COLUMN: crSplineConfig,

  AREA_YEARLY: crAreaYearlyConfig,
  MAP: crMapConfig,

  COLUMN_SET: crCategoryConfig,
  BAR_SET: crCategoryConfig,
  BAR_WITH_LABELS: crCategoryConfig,
  DOT_SET: crCategoryConfig
};

const _rToSeria = {
  AREA: crSplineSeria,
  SPLINE: crSplineSeria,
  COLUMN: crSplineSeria,

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
  const { seriaType } = option;
  if (!seriaType || !router[seriaType]) {
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
    , _crConfig = _rToConfig[seriaType]
    , config = _crConfig
       ? _crConfig(json, option)
       : {} ;

    config.zhCompType = zhCompType
    return { config };
 },

  toSeries(json, option, chart){
    _checkSeriaType(_rToConfig, option)
    const { seriaType } = option
    , _crSeria = _rToSeria[seriaType]
    , seria = _crSeria
       ? _crSeria(json, option, chart)
       : void 0;
    return seria;
  }
}

export default EuroStatAdapter
