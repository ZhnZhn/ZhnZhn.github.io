

import _ from 'lodash';
import Big from 'big.js';

import {ChartType} from '../constants/Type';
import Chart from '../constants/Chart';
import ChartConfig from '../constants/ChartConfig';

import {
  fnCreateZhConfig,
  fnCreateDatasetInfo,
  fnCreateValueMoving,
  fnCreatePercent,
  fnSetTitleToConfig
} from './QuandlFn';

import { fnCalcTotal } from './StackedFn';

const _fnCreateDataAndTotal = function(yearData=[], items=[]){
  const year = (yearData[0]) ? yearData[0].split('-')[0] : '';
  let data = []
    , bTotal = Big('0.0');

  items.forEach((item, itemIndex) =>{
    let value = yearData[item.value];
    if (value){
       data.push({
          year : year,
          name : item.caption,
          nameFull: item.caption,
          value : value,
        });
       bTotal = bTotal.plus(value);
    }
  });

  data = _.sortBy(data, 'value').reverse();

  return {data, bTotal};
}

const _fnCalcLevelAndSetPercent = function(data, bTotal){
  let _bLevel = Big('0.0')
    , level60 = 0
    , level90 = 0;

   data.forEach((point, pointIndex) => {
      const {value, name} = point
          , percent = fnCreatePercent({
              bValue: Big(value), bTotal: bTotal
            }).toString();
      point.total = bTotal.toString();
      point.percent = percent;
      if ( !_bLevel.gte('60.0') ){
         point.name = `${percent} ${name}`;
         point.dataLabels = {
           style : {
             fontSize : '16px'
           }
         }
         level60 +=1;
       } else if ( !_bLevel.gte('90.0') ){
          point.name = `${percent} ${name.split(';')[0].substring(0, 9)}`;
          level90 +=1;
       } else {
          point.name = percent;
       }
       _bLevel = _bLevel.plus(percent);
    })

    return {level60, level90}
}

const _fnSetColorToPoint = function(data, level60, level90){
  const period = Chart.COLOR_PERIOD
      , base1 = Chart.COLOR_BASE1
      , base2 = Chart.COLOR_BASE2;

  data.forEach((point, pointIndex) => {
     if (pointIndex < level60){
       let deltaColor = pointIndex * ( period / level60 );
       point.color = Chart.fCreateMonoColor(base1, deltaColor);
     } else if ( pointIndex < level60+level90 ) {
       let deltaColor = (pointIndex-level60) * ( period / level90 );
       point.color = Chart.fCreateMonoColor(base2, deltaColor);
     } else {
       point.color = Chart.fnGetMonoColor(pointIndex-level60-level90)
     }
   })
}

export const fCreateTreeMapConfig = function(json, option){
  const config = ChartConfig.fBaseTreeMapConfig()
     ,  {sliceItems:items100=[], value=''} = option
     ,  zhSeriaId = `${value}_${ChartType.TREE_MAP}`
     ,  jsonData = (json.dataset && json.dataset.data) ? json.dataset.data : []
     ,  chartType = ChartType.TREE_MAP

     , {data, bTotal } = _fnCreateDataAndTotal(jsonData[0], items100)
     , {level60, level90} = _fnCalcLevelAndSetPercent(data, bTotal)
     , bPrevTotal = fnCalcTotal(jsonData[1], items100);

   _fnSetColorToPoint(data, level60, level90);

  config.series = [ ChartConfig.fCreateTreeMapSeria(zhSeriaId, data) ];
  config.chart.height = Chart.STACKED_HEIGHT;

  fnSetTitleToConfig(config, option);

  config.valueMoving = fnCreateValueMoving({
    bNowValue  : bTotal,
    bPrevValue : bPrevTotal
  });

  config.zhConfig = fnCreateZhConfig(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = fnCreateDatasetInfo(json);


  return {config}
}
