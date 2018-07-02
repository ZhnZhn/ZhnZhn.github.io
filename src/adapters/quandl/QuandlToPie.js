
import Big from 'big.js';

import AdapterFn from '../AdapterFn';
import { ChartType } from '../../constants/Type';
import Chart from '../../charts/Chart';
import ChartConfig from '../../charts/ChartConfig';

import {
  crValueMoving,
  crZhConfig
} from './StackedFn';
import QuandlFn2 from './QuandlFn2';

const _fnCalcPieLegendHeight = function(length){
  if (length !== 0){
    return Chart.HEIGHT + Chart.LEGEND_ROW_HEIGHT*(Math.ceil(length / 4) - 1);
  } else {
    return Chart.HEIGHT;
  }
}

const _fnAddPercentToItem = function(item, bTotal){
  const _bPercent = QuandlFn2.createPercent({ bValue : Big(item.y), bTotal: bTotal});
  if (Big(_bPercent).gte('10.00')) {
     item.name = item.name + ' ' + _bPercent;
  } else {
     item.name = item.name + '  ' + _bPercent;
  }
}

const _fnCreateTopDonutData = function({
  data=[], bTotal=Big('0.0'), isPercent=false
}){
  const arr = []
      , _bTotal90 = bTotal.times(0.9);
  let bArrTotal = Big('0.0');
  for (let i=0, max=data.length; i<max; i++ ){
    let item = data[i];
    if ( i === 0 ||
         !bArrTotal.gte(_bTotal90) ||
         i === max-1 )
    {
      if (isPercent) {
        _fnAddPercentToItem(item, bTotal);
      }
      arr.push(item);
    } else { break; }

    bArrTotal = bArrTotal.plus(item.y);
  }
  if (!bArrTotal.eq(bTotal)) {
    bArrTotal = bTotal.minus(bArrTotal);
    arr.push({
      name : 'Other ' + QuandlFn2.createPercent({ bValue: bArrTotal, bTotal: bTotal}),
      nameFull : 'Other',
      color : 'gray',
      y : parseFloat(bArrTotal)
    })
  }
  return arr;
}

export const fCreatePieConfig = function(json, option){
   const config = ChartConfig.fBasePieConfig()
       , {sliceItems:items=[], value=''} = option
       , zhSeriaId = `${value}_${ChartType.SEMI_DONUT}`
       , jsonData = (json.dataset && json.dataset.data) ? json.dataset.data : []
       , jsonData1 = jsonData[0]
       , jsonData2 = jsonData[1]
       , _year1 = (jsonData1[0]) ? jsonData1[0].split('-')[0] : ''
       , _year2 = (jsonData2[0]) ? jsonData2[0].split('-')[0] : ''
       , _data1 = []
       , _data2 = [];

   let _bTotal1 = Big('0.0');
   let _bTotal2 = Big('0.0');


   items.forEach((item, index) =>{
       let y1 = jsonData1[item.value];
       let y2 = jsonData2[item.value];
       if (y1){
         //const _nameFull = item.caption.replace(/;/g, '<br/>')
         const _name = item.caption.split(';')[0].substring(0, 9);
         _data1.push({name : _name, nameFull: item.caption, y: y1});
         _bTotal1 = _bTotal1.plus(y1);
       }
       if (y2){
         _data2.push({nameFull: item.caption, y: y2});
         _bTotal2 = _bTotal2.plus(y2);
       }
   });

   const _dataTop1 = _fnCreateTopDonutData({
     data: _data1.sort(AdapterFn.compareByY).reverse(),
     bTotal : _bTotal1,
     isPercent : true
   });
   const _dataTop2 = _fnCreateTopDonutData({
     data: _data2.sort(AdapterFn.compareByY).reverse(),
     bTotal: _bTotal2
   });

   config.series = [
      ChartConfig.fInnerPieSeria({
       center : ['20%', '80%'],
       year : _year1,
       bTotal : ChartConfig.fnNumberFormat(_bTotal1)
      })
    , ChartConfig.fOuterPieSeria({
        zhSeriaId : zhSeriaId,
        center  : ['20%', '80%'],
        data : _dataTop1,
        isShowInLegend : true
      })
    , ChartConfig.fInnerPieSeria({
        center : ['70%', '80%'],
        year : _year2,
        bTotal : ChartConfig.fnNumberFormat(_bTotal2)
      })
    , ChartConfig.fOuterPieSeria({
        zhSeriaId : zhSeriaId,
        center  : ['70%', '80%'],
        data : _dataTop2
     })
   ];

   QuandlFn2.setTitleToConfig(config, option);

   Object.assign(config, {
     chart: {
       height: _fnCalcPieLegendHeight(_dataTop1.length)
     },
     valueMoving: crValueMoving(_bTotal1, _year1, _bTotal2, _year2),
     zhConfig: crZhConfig(option, zhSeriaId),
     info: QuandlFn2.createDatasetInfo(json)
   })

   return { config };
}
