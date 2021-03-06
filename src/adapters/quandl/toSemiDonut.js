
import Big from 'big.js';

import AdapterFn from '../AdapterFn';
import { ChartType } from '../../constants/Type';
import formatAllNumber from '../../utils/formatAllNumber';
import Chart from '../../charts/Chart';
import ChartConfig from '../../charts/ChartConfig';

import QuandlFn from './QuandlFn';
import fnStacked from './fnStacked';

const { crValueMoving, crZhConfig } = fnStacked;

const _assign = Object.assign
, {
   setTitleToConfig,
   createDatasetInfo,
   createPercent
  }  = QuandlFn
, {
    crPieConfig,
    crInnerPieSeria,
    crOuterPieSeria
  } = ChartConfig
, { compareByY } = AdapterFn
, { HEIGHT, LEGEND_ROW_HEIGHT } = Chart;

const _calcLegendHeight = (length) => length !== 0
  ? HEIGHT + LEGEND_ROW_HEIGHT*(Math.ceil(length / 4) - 1)
  : HEIGHT;

const _addPercentToItem = (item, bTotal) => {
  const _bPercent = createPercent({
    bValue: Big(item.y),
    bTotal: bTotal
  });
  item.name += (' ' + _bPercent);
}

const _createTopDonutData = ({
  isPercent=false,
  data=[],
  bTotal=Big('0.0')
}) => {
  const arr = []
  , _bTotal90 = bTotal.times(0.9);
  let bArrTotal = Big('0.0')
  , i=0, _max = data.length;
  for (; i<_max; i++ ){
    const item = data[i];
    if ( i === 0 ||
         !bArrTotal.gte(_bTotal90) ||
         i === _max-1 )
    {
      if (isPercent) {
        _addPercentToItem(item, bTotal);
      }
      arr.push(item);
    } else { break; }

    bArrTotal = bArrTotal.plus(item.y);
  }
  if (!bArrTotal.eq(bTotal)) {
    bArrTotal = bTotal.minus(bArrTotal);
    arr.push({
      name: 'Other ' + createPercent({ bValue: bArrTotal, bTotal: bTotal}),
      nameFull: 'Other',
      color: 'gray',
      y: parseFloat(bArrTotal)
    })
  }
  return arr;
}

const _crYear = yearStr =>  yearStr
  ? yearStr.split('-')[0]
  : '';
const _sortData = data => data
 .sort(compareByY).reverse();

const toSemiDonut = function(json, option){
   const config = crPieConfig()
   , {sliceItems:items=[], value=''} = option
   , id = `${value}_${ChartType.SEMI_DONUT}`
   , jsonData = json.dataset.data
   , jsonData1 = jsonData[0]
   , jsonData2 = jsonData[1]
   , _year1 = _crYear(jsonData1[0])
   , _year2 = _crYear(jsonData2[0])
   , _data1 = []
   , _data2 = [];

   let _bTotal1 = Big('0.0');
   let _bTotal2 = Big('0.0');

   items.forEach(item => {
     const { value, caption } = item
     , y1 = jsonData1[value]
     , y2 = jsonData2[value];
     if (y1){
       _data1.push({
          name: (caption || '').split(';')[0].substring(0, 9),
          nameFull: caption, y: y1
        });
       _bTotal1 = _bTotal1.plus(y1);
     }
     if (y2){
       _data2.push({ nameFull: caption, y: y2 });
       _bTotal2 = _bTotal2.plus(y2);
     }
   });

   const _dataTop1 = _createTopDonutData({
     isPercent: true,
     data: _sortData(_data1),
     bTotal: _bTotal1,
  });
   const _dataTop2 = _createTopDonutData({
     data: _sortData(_data2),
     bTotal: _bTotal2
   });

   config.series = [
     crInnerPieSeria({
       center: ['20%', '80%'],
       year: _year1,
       bTotal: formatAllNumber(_bTotal1)
      })
    , crOuterPieSeria({
        center: ['20%', '80%'],
        data: _dataTop1,
        isShowInLegend: true
      })
    , crInnerPieSeria({
        center: ['70%', '80%'],
        year: _year2,
        bTotal: formatAllNumber(_bTotal2)
      })
    , crOuterPieSeria({
        center: ['70%', '80%'],
        data: _dataTop2
     })
   ];

   setTitleToConfig(config, option);

   _assign(config, {
     chart: {
       height: _calcLegendHeight(_dataTop1.length)
     },
     valueMoving: crValueMoving(_bTotal1, _year1, _bTotal2, _year2),
     zhConfig: crZhConfig(option, id),
     info: createDatasetInfo(json)
   })

   return { config };
}

export default toSemiDonut
