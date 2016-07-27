
import { ChartType, LoadType } from '../../constants/Type';

const LogicUtils = {
  createKeyForConfig(option){
    const key = (option.loadId === LoadType.QCT && !option.isLoadMeta)
            ? (option.seriaType === ChartType.AREA)
                  ? `${option.value}_${ChartType.AREA}_${option.dataColumn}`
                  : `${option.value}_${option.seriaType}`
            : option.value    
    return key;
  }
}

export default LogicUtils
