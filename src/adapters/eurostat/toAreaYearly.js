import ChartConfig from '../../charts/ChartConfig'
import EuroStatFn from './EuroStatFn';
import ToYearly from '../ToYearly'

const _crTimeIndexAndValue = json => {
  const { dimension={}, value=[] } = json
      , { time={} } = dimension
      , { category={} } = time
      , { index:timeIndex=0 } = category;
  return { timeIndex, value };
}

const toAreaYearly = {
   createConfig: (json, option) => {
     const { timeIndex, value } = _crTimeIndexAndValue(json)
         , data = EuroStatFn.toPointArr(timeIndex, value)
         , { title, subtitle, dataSource } = option
         , config = ToYearly.toConfig(
             data.reverse(), {
             title, subtitle,
             itemCaption: title + ': ' + subtitle,
             value: title + '_' + subtitle,
             dataSource
           })

      EuroStatFn.setInfo({ config, json, option });
      return config;
   },
   
   createSeria: (json, option) => {
     const seria = ChartConfig.fSeries()
     Object.assign(seria, {
       zhSeriaId: 'Empty_Seria',
       zhValueText: 'Empty Seria'
     })
     return seria;
   }

};

export default toAreaYearly
