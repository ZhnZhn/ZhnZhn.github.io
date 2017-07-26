import Big from 'big.js';

import AdapterFn from './AdapterFn'

import {ChartType} from '../constants/Type';
import Chart from '../charts/Chart';
import ChartConfig from '../charts/ChartConfig';

import QuandlFn2 from './QuandlFn2';

const _rFactorySeria = {
  [ChartType.STACKED_AREA] : ChartConfig.fStackAreaSeria,
  [ChartType.STACKED_AREA_PERCENT] : ChartConfig.fStackAreaSeria,
  [ChartType.STACKED_COLUMN] : ChartConfig.fStackedColumnSeria,
  [ChartType.STACKED_COLUMN_PERCENT] : ChartConfig.fStackedColumnSeria
}

export const fnCalcTotal = function(jsonData=[], items=[]){
   let _bTotal = Big('0.0');
   for(let i=0, max=items.length; i<max; i++ ){
     let y = jsonData[items[i].value]
     if (y){
       _bTotal = _bTotal.plus(y);
     }
   }
   return _bTotal;
}

const _fnCreateReferenceDataAndTotal = function(jsonData, items){
  let _data = []
    , _bTotal = Big('0.0');

  items.forEach( item => {
    const { caption, value } = item
        , y = jsonData[value];
    if (y) {
       const _arr = caption.split(';')
            , _name = _arr[0]
                ? _arr[0].substring(0, 9)
                : caption;
       _data.push({
          name : _name,
          nameFull: caption,
          y: y,
          _jsonIndex : value
        });
       _bTotal = _bTotal.plus(y);
    }
  });

  _data.sort(AdapterFn.compareByY).reverse()  

  return { referenceData : _data, bTotal : _bTotal };
}

const _fnCreateDataTopPercent = function(data, bTotal, percent){
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


const _fnInitSeries = function({ items, zhSeriaId, chartType, fSeria }){
  return items.map((item, itemIndex)=>{
           const color = Chart.fnGetMonoColor(itemIndex)
               , {name} = item
               return fSeria({ zhSeriaId, name, color })
         });
}


const _fnCalcPercent = function(bTotal=Big('0.0'), bValue=Big('0.0')){
  return (!bTotal.eq(Big(0.0)) )
            ? bValue.times(100).div(bTotal).abs().toFixed(2) + '%' : Big(0.0) + '%';
}

const _fnCreateStackedSeries = function({
  jsonData, items100, items90, zhSeriaId, chartType, stacking
}){
   const fSeria = _rFactorySeria[chartType]
       , series = _fnInitSeries({ items:items90, zhSeriaId, chartType, fSeria })
       , categories = []
       , dataOther = []

   jsonData = jsonData.reverse();
   jsonData.forEach((yearData, i) =>{
     let yearTotal100 = fnCalcTotal(yearData, items100)
       , yearTotal90  = Big('0.0')
       , isFullYearData = true;
     items90.forEach((item, itemIndex) => {
        const y = yearData[item._jsonIndex]
            , percent = (y) ? _fnCalcPercent(yearTotal100, Big(y)) : '0.0%';
        series[itemIndex].data.push({
           y : y,
           nameFull : item.nameFull,
           percent : percent,
           total : parseInt(yearTotal100.toString(), 10)
         })
        if (y) {
          yearTotal90 = yearTotal90.plus(y);
        } else {
          isFullYearData = false;
        }
     })
     if ( stacking === 'percent' && !isFullYearData && categories.length === 0 ){
        items90.forEach((item, itemIndex) => {
           series[itemIndex].data = [];
        })
     } else {
        categories.push(yearData[0].split('-')[0]);
        const yOther = parseInt(yearTotal100.minus(yearTotal90).toString(), 10);
        dataOther.push({
          y : yOther,
          nameFull : 'Other',
          percent : _fnCalcPercent(yearTotal100, Big(yOther)),
          total : parseInt(yearTotal100.toString(), 10)
       })
     }
   })

   series.push(
     fSeria({
       zhSeriaId : zhSeriaId,
       name : 'Other',
       data : dataOther,
       color: 'gray'
     })
   )

   return { series, categories };
}

export const fnCreateStackedConfig = function({
   jsonData, items100, zhSeriaId, chartType=ChartType.STACKED_AREA, stacking='normal'
 }){
  const {referenceData , bTotal} = _fnCreateReferenceDataAndTotal(jsonData[0], items100)
      , items90 = _fnCreateDataTopPercent(referenceData, bTotal, 0.9)
      , bPrevTotal = fnCalcTotal(jsonData[1], items100)
      , dateTo = (jsonData[1][0]) ? jsonData[1][0] : ''
      , { series, categories } = _fnCreateStackedSeries({
          jsonData, items100, items90, zhSeriaId, chartType, stacking
        })
      , date = ( categories && categories.length>1 )
           ? categories[categories.length-1]
           : '';

  return {bNowTotal : bTotal, date, bPrevTotal, dateTo, series, categories};
}

export const fnCreateSparkData = function(jsonData, itemIndex, bYearTotals){
  const sparkvalues = []
      , sparkpercent = [];

  jsonData.forEach( (yearData, yearIndex) => {
      sparkvalues.push( yearData[itemIndex] );
      if ( yearData[itemIndex] ) {
         sparkpercent.push( parseFloat(QuandlFn2.createPercent({
            bValue : Big(yearData[itemIndex]),
            bTotal : bYearTotals[yearIndex]
         }), 10) );
      } else {
        sparkpercent.push( null );
      }
  })

  return { sparkvalues, sparkpercent }
}

export const crValueMoving = function(bNowTotal, date, bPrevTotal, dateTo){
  return Object.assign(
      QuandlFn2.createValueMoving({
        bNowValue  : bNowTotal,
        bPrevValue : bPrevTotal
      }),
      {
        date: date,
        dateTo: dateTo.split('-')[0],
        valueTo: ChartConfig.fnNumberFormat(bPrevTotal),
        isDenyToChange: true
      }
   );
}

export const crZhConfig = function(option, zhSeriaId){
  return Object.assign(
       QuandlFn2.createZhConfig(option),
      {
        id:zhSeriaId,
        isWithoutAdd:true,
        isWithoutIndicator:true
      }
  );
}
