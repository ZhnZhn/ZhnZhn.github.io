import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_COLUMN,

  CHT_AREA_YEARLY,
  CHT_MAP,

  CHT_COLUMN_SET,
  CHT_BAR_SET,
  CHT_BAR_WITH_LABELS,
  CHT_DOT_SET
} from '../../constants/ChartType';

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

const DF_TYPE = CHT_SPLINE;
const _rToConfig = {
  [CHT_AREA]: crSplineConfig,
  [CHT_SPLINE]: crSplineConfig,
  [CHT_COLUMN]: crSplineConfig,

  [CHT_AREA_YEARLY]: crAreaYearlyConfig,
  [CHT_MAP]: crMapConfig,

  [CHT_COLUMN_SET]: crCategoryConfig,
  [CHT_BAR_SET]: crCategoryConfig,
  [CHT_BAR_WITH_LABELS]: crCategoryConfig,
  [CHT_DOT_SET]: crCategoryConfig
};

const _rToSeria = {
  [CHT_AREA]: crSplineSeria,
  [CHT_SPLINE]: crSplineSeria,
  [CHT_COLUMN]: crSplineSeria,

  [CHT_COLUMN_SET]: crCategorySeria,
  [CHT_BAR_SET]: crCategorySeria,
  [CHT_BAR_WITH_LABELS]: crCategorySeria,
  [CHT_DOT_SET]: crCategorySeria
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
