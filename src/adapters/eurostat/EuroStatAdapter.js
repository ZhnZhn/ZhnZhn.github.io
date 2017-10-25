import toArea from './toArea';
import toAreaYearly from './toAreaYearly'
import toColumn from './toColumn';
import toBar from './toBar';
import toMap from './toMap';


const _rToConfig = {
  AREA : toArea.createConfig,
  AREA_YEARLY: toAreaYearly.createConfig,
  MAP : toMap.createConfig,
  COLUMN : toColumn.createConfig,
  BAR : toBar.createConfig
}

const _rToSeria = {
  AREA : toArea.createSeria,
  COLUMN : toColumn.createSeria,
  BAR : toColumn.createSeria
}

const EuroStatAdapter = {
  toConfig(json, option){
    const { seriaType='AREA' } = option
         , fnToConfig = _rToConfig[seriaType]
         , config = (typeof fnToConfig !== 'undefined')
             ? fnToConfig(json, option)
             : {} ;

       return { config };
 },

  toSeries(json, option, chart){
    const { seriaType='AREA' } = option
         , fnToSeria = _rToSeria[seriaType]
         , seria = (typeof fnToSeria !== 'undefined')
             ? fnToSeria(json, option, chart)
             : undefined ;

    return seria;
  }
}

export default EuroStatAdapter
