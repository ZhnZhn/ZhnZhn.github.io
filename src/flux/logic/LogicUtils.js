
import { ChartType, LoadType } from '../../constants/Type';

const _fnCreateQuandlKey = function(option){
  const {
          loadId, isLoadMeta,
          value, dataColumn, seriaType,
          viewKey
        } = option;
  return (loadId === LoadType.QCT && !isLoadMeta)
          ? (seriaType === ChartType.AREA)
                ? `${value}_${ChartType.AREA}_${dataColumn}`
                : `${value}_${seriaType}`
          : (viewKey)
              ? viewKey
              : value;
}

const _fnCreateEuroStatKey = function(option){
  const {
          geo='', group='', metric='',
          seriaType='AREA', time=''
         } = option
      , _metric = metric.replace('?', '_');
  return `${geo}_${group}_${_metric}_${seriaType}_${time}`;
}

const LogicUtils = {

  createKeyForConfig(option){
    const { loadId, value } = option;
    switch (loadId) {
      case LoadType.Q: case LoadType.QCT:
        return _fnCreateQuandlKey(option);
      case LoadType.EU_STAT:
         return _fnCreateEuroStatKey(option);
      case LoadType.WL:
         return option.id;
      default :
        return value || 'key';
    }
  }

}

export default LogicUtils
