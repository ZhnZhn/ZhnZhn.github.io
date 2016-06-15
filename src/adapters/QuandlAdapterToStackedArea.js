
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
       } from './QuandlAdapterFn';


const _fnCalcTotal = function(items=[], jsonData=[]){
   let _bTotal = Big('0.0');
   for(let i=0, max=items.length; i<max; i++ ){
     let y = jsonData[items[i].value]
     if (y){
       _bTotal = _bTotal.plus(y);
     }
   }
   return _bTotal;
}

const _fnDataAndTotalFromItems = function(items, jsonData){
  let _data = []
    , _bTotal = Big('0.0');

  items.forEach((item, index) =>{
    let y = jsonData[item.value];
    if (y){
       //const _nameFull = item.caption.replace(/;/g, '<br/>')
       const _name = item.caption.split(';')[0].substring(0, 9);
       _data.push({
          name : _name,
          nameFull: item.caption,
          y: y,
          _jsonIndex : item.value
        });
       _bTotal = _bTotal.plus(y);
    }
  });

  _data = _.sortBy(_data, 'y').reverse();

  return {_data, _bTotal}
}

const _fnDataTopPercent = function(data, bTotal, percent){
  const _dataTopPercent = []
      , _bTotal90 = bTotal.times(percent);
  let _bArrTotal = Big('0.0');
  for (let i=0, max=data.length; i<max; i++ ){
    let item = data[i];
    if ( i === 0 ||
         !_bArrTotal.gte(_bTotal90) ||
         i === max-1 )
    {
      _dataTopPercent.push(item);
    } else { break; }

    _bArrTotal = _bArrTotal.plus(item.y);
  }

  return _dataTopPercent;
}

const _fnInitSeries = function(items, zhSeriaId){
  return items.map((item, itemIndex)=>{
           const color = Chart.fnGetMonoColor(itemIndex)
               , {name} = item
           return ChartConfig.fStackAreaSeria({ zhSeriaId, name, color })
         });
}

const _fnCreateStackedSeries = function(jsonData, items100, items90, zhSeriaId){
   const series = _fnInitSeries(items90, zhSeriaId)
       , categories = []
       , dataOther = []

   jsonData = jsonData.reverse();
   jsonData.forEach((yearData, i) =>{
     let yearTotal100 =_fnCalcTotal(items100, yearData)
       , yearTotal90  = Big('0.0')
     categories.push(yearData[0].split('-')[0]);
     items90.forEach((item, itemIndex) => {
        const y = yearData[item._jsonIndex];
        series[itemIndex].data.push({
           y : y,
           nameFull : item.nameFull
         })
        if (y) {
          yearTotal90 = yearTotal90.plus(y);
        }
     })
     dataOther.push({
       nameFull : 'Other',
       y : parseInt(yearTotal100.minus(yearTotal90).toString(), 10)
     })
   })

   series.push(
     ChartConfig.fStackAreaSeria({
       zhSeriaId : zhSeriaId,
       name : 'Other',
       data : dataOther,
       color: 'gray'
     })
   )

   return { series, categories };
}

export const fCreateStackedAreaConfig = function(json, option){
  const config = ChartConfig.fBaseStackAreaConfig()
      , {sliceItems:items100=[], value=''} = option
      , zhSeriaId = `${value}_${ChartType.STACKED_AREA}`
      , jsonData = (json.dataset && json.dataset.data) ? json.dataset.data : []

      , {_data , _bTotal} = _fnDataAndTotalFromItems(items100, jsonData[0])
      , items90 = _fnDataTopPercent(_data, _bTotal, 0.9)
      , _bPrevTotal = _fnCalcTotal(items100, jsonData[1])
      , { series, categories } = _fnCreateStackedSeries(
         jsonData, items100, items90, zhSeriaId
      );

  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = 500;

  fnSetTitleToConfig(config, option);

  config.valueMoving = fnCreateValueMoving({
    bNowValue  : _bTotal,
    bPrevValue : _bPrevTotal
  });

  config.zhConfig = fnCreateZhConfig(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = fnCreateDatasetInfo(json);

  return {config}
}
