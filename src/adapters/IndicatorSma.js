
import Big from 'big.js';

import ChartConfig from '../charts/ChartConfig';

export const fnAddSeriesSma = function(option){
  const { chart, id, period, isPlus, plus } = option
      , parentId = chart.options.zhConfig.id
      , dataSma = []
      , data = chart.series[0].data;

  let bSum = Big('0.0');
  let i=0, max=data.length, point;
  const _period = (isPlus)
           ? parseFloat(Big(period).plus(plus).minus(1).toFixed(0))
           : parseFloat(Big(period).minus(1).toFixed(0));
  for (; i<max; i++){
    point = data[i];
    if (i>_period){
       bSum = bSum.plus(point.y).minus(data[i-period].y);
       dataSma.push([point.x, parseFloat(bSum.div(period).toFixed(2))])
    } else {
      bSum = bSum.plus(point.y);
    }
  }

  if (dataSma.length>0){
    const seria = Object.assign(
      ChartConfig.fSeries(), {
        zhSeriaId: parentId + '_' + id,
        zhValueText: id,
        lineWidth: 2,
        data: dataSma
      }
    );
    chart.addSeries(seria, true, true)
    return chart.options.colors[seria['_colorIndex']];
  } else {
    console.log('It seems, there are not enough data for SMA(' + period + ')')
    return undefined;
  }
}

export const fnRemoveSeries = function(chart, zhValueText){
   const series = chart.series;
   for (var i=0, max=series.length; i<max; i++){
     if (series[i].userOptions.zhValueText === zhValueText){
       series[i].remove(true);
       return true;
     }
   }
   return false;
}

const _fnConvertToUTC = function(str){
   const arrDate = str.split('-');
   return  Date.UTC(arrDate[0], (parseInt(arrDate[1], 10)-1), arrDate[2]);
}


const _fnGetPriceAndFlow = function(point){
  const close = point[4]
      , high = (point[2]) ? point[2] : close
      , low  = (point[3]) ? point[2] : close
      , bTp = Big(high).plus(low).plus(close).div(3)
      , bRmf = bTp.times(point[5])
      , isFullData = (point[2] && point[3]) ? true : false;
  return {bTp, bRmf, isFullData}
};

export const fnGetConfigMfi = function(chart, period, id){

  const data = chart.options.zhPoints
       , parentId = chart.options.zhConfig.id
       , dataMcad = []
       , nPeriod = parseFloat(period) + 1;

   let bPositiveFlow = Big('0.0')
     , bNegativeFlow = Big('0.0001')
     , nNotFullPoint = 0;

   for (var i=0, max=data.length; i<max; i++){
     const point = data[i];
     if (i<nPeriod){
       if (i==0){
         const {bTp, bRmf, isFullData} = _fnGetPriceAndFlow(point);
         if (!isFullData) { nNotFullPoint+=1;}
         dataMcad.push({
           y : null,
           x : _fnConvertToUTC(point[0]),
           isNegative : false,
           tp : parseFloat(bTp.toFixed(4)),
           rmf : parseFloat(bRmf.toFixed(4))
         })
       } else {
         const {bTp, bRmf, isFullData} = _fnGetPriceAndFlow(point);
         if (!isFullData) { nNotFullPoint+=1;}
         let isNegative;
         if (bTp.gt(dataMcad[i-1].tp)){
            bPositiveFlow = bPositiveFlow.plus(bRmf.toFixed(4));
            isNegative = false;
         } else {
           bNegativeFlow = bNegativeFlow.plus(bRmf.toFixed(4));
           isNegative = true;
         }
         dataMcad.push({
           y : null,
           x : _fnConvertToUTC(point[0]),
           isNegative : isNegative,
           tp : parseFloat(bTp.toFixed(4)),
           rmf : parseFloat(bRmf.toFixed(4))
         })
       }
     } else {
        const { bTp, bRmf, isFullData } = _fnGetPriceAndFlow(point);
        if (!isFullData) { nNotFullPoint+=1;}

        let isNegative;
        if (bTp.gt(dataMcad[i-1].tp)){
           bPositiveFlow = bPositiveFlow.plus(bRmf.toFixed(4));
           isNegative = false;
        } else {
          bNegativeFlow = bNegativeFlow.plus(bRmf.toFixed(4));
          isNegative = true;
        }
        if (dataMcad[i-period].isNegative){
          bNegativeFlow = bNegativeFlow.minus(dataMcad[i-period].rmf);
        } else {
          bPositiveFlow = bPositiveFlow.minus(dataMcad[i-period].rmf);
        }

        const bMFR_PlusOne = bPositiveFlow.div(bNegativeFlow.toFixed(4)).plus('1')
            , bRatio = Big('100').div(bMFR_PlusOne.toFixed(4))
            , bY = Big('100').minus(bRatio.toFixed(4));

        dataMcad.push({
          x : _fnConvertToUTC(point[0]),
          y : parseFloat(bY.toFixed(2)),
          zhDate : point[0],
          isNegative : isNegative,
          tp : parseFloat(bTp.toFixed(4)),
          rmf : parseFloat(bRmf.toFixed(4))
        })
     }
   }

   const titleNotFullPoint = (nNotFullPoint !== 0)
           ? ' Not Full Data HL:' + nNotFullPoint
           : ''
       , config = ChartConfig.fIndicatorMfiConfig(
           id, parentId, id + titleNotFullPoint, dataMcad
         ) ;


   return config;
}
