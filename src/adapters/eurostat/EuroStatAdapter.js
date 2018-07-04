import toArea from './toArea';
import toAreaYearly from './toAreaYearly'
import toColumn from './toColumn';
import toBar from './toBar';
import toMap from './toMap';

const DF_TYPE = 'AREA';
const _rToConfig = {
  AREA: toArea.createConfig,
  SPLINE: toArea.createConfig,
  AREA_YEARLY: toAreaYearly.createConfig,
  MAP: toMap.createConfig,
  COLUMN: toColumn.createConfig,
  BAR: toBar.createConfig
};

const _rToSeria = {
  AREA: toArea.createSeria,
  SPLINE: toArea.createSeria,
  COLUMN: toColumn.createSeria,
  BAR: toColumn.createSeria
};

const _checkSeriaType = (router, option, dfType=DF_TYPE) => {
  if (!router[option.seriaType]) {
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
