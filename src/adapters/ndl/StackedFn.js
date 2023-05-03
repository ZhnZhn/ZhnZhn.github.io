import Big from 'big.js';

import { compareByY } from '../compareByFn';
import {
  CHT_STACKED_AREA,
  CHT_STACKED_AREA_PERCENT,
  CHT_STACKED_COLUMN,
  CHT_STACKED_COLUMN_PERCENT
} from '../../constants/ChartType';
import { getMonoColor } from '../../charts/MonoColorFn';
import {
  crStackedAreaSeria,
  crStackedColumnSeria
} from '../../charts/StackedConfigFn';

import { crPercent } from './NdlFn';

const _rFactorySeria = {
  [CHT_STACKED_AREA]: crStackedAreaSeria,
  [CHT_STACKED_AREA_PERCENT]: crStackedAreaSeria,
  [CHT_STACKED_COLUMN]: crStackedColumnSeria,
  [CHT_STACKED_COLUMN_PERCENT]: crStackedColumnSeria
}

export const calcTotal = (
  jsonData=[],
  items=[]
) => {
   let _y, _bTotal = Big('0.0');
   for(let i=0, max=items.length; i<max; i++ ){
     _y = jsonData[items[i].value]
     if (_y){
       _bTotal = _bTotal.plus(_y);
     }
   }
   return _bTotal;
}

const _crReferenceDataAndTotal = (
  jsonData,
  items
) => {
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

  _data.sort(compareByY).reverse()

  return {
    referenceData: _data,
    bTotal: _bTotal
  };
}

const _crDataTopPercent = (
  data,
  bTotal,
  percent
) => {
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


const _initSeries = ({
  items,
  chartType,
  fSeria
}) => items.map((item, itemIndex)=>{
    const color = getMonoColor(itemIndex)
    , { name } = item;
    return fSeria({ name, color })
});

const _calcPercent = (
  bTotal=Big('0.0'),
  bValue=Big('0.0')
) => !bTotal.eq(Big(0.0))
   ? bValue.times(100).div(bTotal).abs().toFixed(2) + '%'
   : Big(0.0) + '%';


const _crStackedSeries = ({
  jsonData,
  items100,
  items90,
  chartType,
  stacking
}) => {
   const fSeria = _rFactorySeria[chartType]
   , series = _initSeries({
       items:items90,
       chartType,
       fSeria
    })
   , categories = []
   , dataOther = [];

   jsonData = jsonData.reverse();
   jsonData.forEach((yearData, i) =>{
     let yearTotal100 = calcTotal(yearData, items100)
     , yearTotal90  = Big('0.0')
     , isFullYearData = true;
     items90.forEach((item, itemIndex) => {
        const y = yearData[item._jsonIndex]
        , percent = y
            ? _calcPercent(yearTotal100, Big(y))
            : '0.0%';
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
          percent : _calcPercent(yearTotal100, Big(yOther)),
          total : parseInt(yearTotal100.toString(), 10)
       })
     }
   })

   series.push(
     fSeria({
       name : 'Other',
       data : dataOther,
       color: 'gray'
     })
   )

   return { series, categories };
}

export const crStackedConfig = ({
   jsonData,
   items100,
   chartType=CHT_STACKED_AREA,
   stacking='normal'
 }) => {
  const {referenceData , bTotal} = _crReferenceDataAndTotal(jsonData[0], items100)
  , items90 = _crDataTopPercent(referenceData, bTotal, 0.9)
  , bPrevTotal = calcTotal(jsonData[1], items100)
  , dateTo = (jsonData[1][0]) ? jsonData[1][0] : ''
  , { series, categories } = _crStackedSeries({
      jsonData, items100, items90, chartType, stacking
    })
  , _categoriesLength = (categories || []).length
  , date = _categoriesLength>1
      ? categories[_categoriesLength-1]
      : '';

  return {
    bNowTotal: bTotal,
    date,
    bPrevTotal,
    dateTo,
    series,
    categories
  };
}

export const crSparkData = (
  jsonData,
  itemIndex,
  bYearTotals
) => {
  const sparkvalues = []
  , sparkpercent = [];

  jsonData.forEach((yearData, yearIndex) => {
      sparkvalues.push( yearData[itemIndex] );
      if ( yearData[itemIndex] ) {
         sparkpercent.push(parseFloat(crPercent({
            bValue: Big(yearData[itemIndex]),
            bTotal: bYearTotals[yearIndex]
         }), 10));
      } else {
        sparkpercent.push(null);
      }
  })

  return { sparkvalues, sparkpercent };
}
