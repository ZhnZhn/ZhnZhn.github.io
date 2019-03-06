import toArea from './toArea';
import toAreaYearly from './toAreaYearly'
import toCategory from './toCategory'
import toMap from './toMap';

const DF_TYPE = 'SPLINE';
const _rToConfig = {
  AREA: toArea.createConfig,
  SPLINE: toArea.createConfig,
  COLUMN: toArea.createConfig,
  AREA_YEARLY: toAreaYearly.createConfig,
  MAP: toMap.createConfig,
  COLUMN_SET: toCategory.createConfig,
  BAR_SET: toCategory.createConfig,
  DOT_SET: toCategory.createConfig
};

const _rToSeria = {
  AREA: toArea.createSeria,
  SPLINE: toArea.createSeria,
  COLUMN: toArea.createSeria,
  COLUMN_SET: toCategory.createSeria,
  BAR_SET: toCategory.createSeria,
  DOT_SET: toCategory.createSeria  
};

const _checkSeriaType = (router, option, dfType=DF_TYPE) => {
  if (!option.seriaType || !router[option.seriaType]) {
    option.seriaType = dfType
  }
};

const EuroStatAdapter = {
  toConfig(json, option){
    _checkSeriaType(_rToConfig, option)
    const { seriaType, zhCompType } = option
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
             : undefined ;
    return seria;
  }
}

export default EuroStatAdapter
