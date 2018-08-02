import Big from 'big.js';

import dt from '../utils/DateUtils'

const { ymdToUTC } = dt;

const _getPriceAndFlow = (point) => {
  const close = point[4]
      , high = (point[2]) ? point[2] : close
      , low  = (point[3]) ? point[2] : close
      , bTp = Big(high).plus(low).plus(close).div(3)
      , bRmf = bTp.times(point[5])
      , isFullData = (point[2] && point[3])
            ? true : false;
  return { bTp, bRmf, isFullData };
};

const _crMfiXy = (p, y) => ({
  x : ymdToUTC(p),
  y : y
});
const _crMfiDetail = (isNegative, bTp, bRmf, zhDate) => ({
  isNegative : isNegative,
  tp : parseFloat(bTp.toFixed(4)),
  rmf : parseFloat(bRmf.toFixed(4)),
  zhDate : zhDate
});

const mfi = (data, period) => {

  const dataMfi = []
      , nPeriod = parseFloat(period) + 1;

   let bPositiveFlow = Big('0.0')
     , bNegativeFlow = Big('0.0001')
     , isNegative = false
     , nNotFullPoint = 0
     , max=data.length
     , i = 0;

   for (; i<max; i++){
     const point = data[i];
     if (i<nPeriod){
       if (i==0){
         const {bTp, bRmf, isFullData} = _getPriceAndFlow(point);
         if (!isFullData) { nNotFullPoint+=1;}
         dataMfi.push({
           ..._crMfiXy(point[0], null),
           ..._crMfiDetail(false, bTp, bRmf)
         })
       } else {
         const {bTp, bRmf, isFullData} = _getPriceAndFlow(point);
         if (!isFullData) { nNotFullPoint+=1;}
         if (bTp.gt(dataMfi[i-1].tp)){
            bPositiveFlow = bPositiveFlow.plus(bRmf.toFixed(4));
            isNegative = false;
         } else {
           bNegativeFlow = bNegativeFlow.plus(bRmf.toFixed(4));
           isNegative = true;
         }
         dataMfi.push({
           ..._crMfiXy(point[0], null),
           ..._crMfiDetail(isNegative, bTp, bRmf)
         })
       }
     } else {
        const { bTp, bRmf, isFullData } = _getPriceAndFlow(point);
        if (!isFullData) { nNotFullPoint+=1; }
        if (bTp.gt(dataMfi[i-1].tp)){
           bPositiveFlow = bPositiveFlow.plus(bRmf.toFixed(4));
           isNegative = false;
        } else {
          bNegativeFlow = bNegativeFlow.plus(bRmf.toFixed(4));
          isNegative = true;
        }
        if (dataMfi[i-period].isNegative){
          bNegativeFlow = bNegativeFlow.minus(dataMfi[i-period].rmf);
        } else {
          bPositiveFlow = bPositiveFlow.minus(dataMfi[i-period].rmf);
        }

        const bMFR_PlusOne = bPositiveFlow.div(bNegativeFlow.toFixed(4)).plus('1')
            , bRatio = Big('100').div(bMFR_PlusOne.toFixed(4))
            , bY = Big('100').minus(bRatio.toFixed(4));

        dataMfi.push({
          ..._crMfiXy(point[0], parseFloat(bY.toFixed(2))),
          ..._crMfiDetail(isNegative, bTp, bRmf, point[0])
        })
     }
   }

   return {
     dataMfi,
     nNotFullPoint
   };
};

export default mfi
