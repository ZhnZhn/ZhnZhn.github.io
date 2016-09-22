
import { ChartType, LoadType } from '../../constants/Type';

const _fnCreateQuandlKey = function(option){
  return (option.loadId === LoadType.QCT && !option.isLoadMeta)
          ? (option.seriaType === ChartType.AREA)
                ? `${option.value}_${ChartType.AREA}_${option.dataColumn}`
                : `${option.value}_${option.seriaType}`
          : option.value
}

const _fnCreateEuroStatKey = function(option){
  const { geo='', group='', metric='' } = option
      , _metric = metric.replace('?', '_');
  return `${geo}_${group}_${_metric}`;
}

const LogicUtils = {

  createKeyForConfig(option){
    const { loadId } = option;
    switch (loadId) {
      case LoadType.Q: case LoadType.QCT:
        return _fnCreateQuandlKey(option);
      case LoadType.EU_STAT:
         return _fnCreateEuroStatKey(option);
      case LoadType.WL:
         return option.id;      
      default :
        return 'key'
    }
  }

}

export default LogicUtils
