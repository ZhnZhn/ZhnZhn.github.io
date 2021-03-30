import Big from 'big.js';

import AdapterFn from '../AdapterFn'

import { ChartType } from '../../constants/Type';
import Chart from '../../charts/Chart';
import ChartConfig from '../../charts/ChartConfig';

import {
  fnCalcTotal,
  fnCreateSparkData
} from './StackedFn';
import QuandlFn from './QuandlFn';
import fnStacked from './fnStacked'

const _assign = Object.assign
, { crValueMoving, crZhConfig } = fnStacked
, { compareByValue } = AdapterFn
, {
    createPercent,
    setTitleToConfig,
    createDatasetInfo
  } = QuandlFn
, {
   COLOR_PERIOD,
   COLOR_BASE1,
   COLOR_BASE2,   
   crMonoColor,
   getMonoColor
 } = Chart
 , {
   crTreeMapConfig,
   crTreeMapSeria
 } = ChartConfig;

const _crYearTotals = (jsonData, items) => jsonData
  .map(year => fnCalcTotal(year, items))


const _crDataAndTotal = (jsonData=[], items=[], bYearTotals=[]) => {
  const yearData = jsonData[0]
  , _year = yearData[0]
      ? yearData[0].split('-')[0]
      : ''
  , bTotal = bYearTotals[0]
      ? bYearTotals[0]
      : Big('0.0');
  let data = [];

  items.forEach(item => {
    const { value, caption } = item
        , _value = yearData[value];
    if (_value){
       const { sparkvalues, sparkpercent } = fnCreateSparkData(jsonData, value, bYearTotals);
       data.push({
          sparkvalues: sparkvalues.reverse(),
          sparkpercent: sparkpercent.reverse(),
          year: _year,
          name: caption,
          nameFull: caption,
          value: _value
        });
    }
  });

  data.sort(compareByValue).reverse();

  return { data, bTotal };
}

const _calcLevelAndSetPercent = (data, bTotal) => {
  let _bLevel = Big('0.0')
  , level60 = 0
  , level90 = 0;

   data.forEach(point => {
      const { value, name } = point
      , percent = createPercent({
          bValue: Big(value),
          bTotal: bTotal
        }).toString();
      point.total = bTotal.toString();
      point.percent = percent;
      if ( !_bLevel.gte('60.0') ){
         point.name = `${percent} ${name}`;
         point.dataLabels = {
           style: {
             fontSize: '16px'
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

    return { level60, level90 };
}

const _setColorToPoint = (data, level60, level90) => {
  const period = COLOR_PERIOD
  , base1 = COLOR_BASE1
  , base2 = COLOR_BASE2;

  let deltaColor;
  data.forEach((point, pointIndex) => {
     if (pointIndex < level60){
       deltaColor = pointIndex * ( period / level60 );
       point.color = crMonoColor(base1, deltaColor);
     } else if ( pointIndex < level60+level90 ) {
       deltaColor = (pointIndex-level60) * ( period / level90 );
       point.color = crMonoColor(base2, deltaColor);
     } else {
       point.color = getMonoColor(pointIndex-level60-level90)
     }
   })
}

const toTreeMap = function(json, option){
  const config = crTreeMapConfig()
  ,  { sliceItems:items100=[], value='' } = option
  ,  id = `${value}_${ChartType.TREE_MAP}`
  ,  jsonData = json.dataset.data
  ,  bYearTotals = _crYearTotals(jsonData, items100)
  , { data, bTotal } = _crDataAndTotal(jsonData, items100, bYearTotals)
  , { level60, level90 } = _calcLevelAndSetPercent(data, bTotal)
  , bPrevTotal = fnCalcTotal(jsonData[1], items100)
  , dateTo = jsonData[1][0] ? jsonData[1][0] : '';

   _setColorToPoint(data, level60, level90);

  const yearTitle = jsonData[0] && jsonData[0][0]
    ? jsonData[0][0].split('-')[0]
    : '';
  option.title = `${yearTitle}:${option.title}`
  setTitleToConfig(config, option)

  _assign(config, {
    series: [crTreeMapSeria(data)],
    valueMoving: crValueMoving(bTotal, yearTitle, bPrevTotal, dateTo),
    zhConfig: crZhConfig(option, id),
    info: createDatasetInfo(json)
  })

  return { config };
}

export default toTreeMap
