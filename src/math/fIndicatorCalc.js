import {
  isNotEmptyArr,
  isNumber,
  crPointGetter
} from './seriaHelperFn';

const _crIndicatorData = (d, rt, calc) => {
  const _d = []
  , max = d.length
  , prevStep = rt-1
  , { getX, getY } = crPointGetter(d);
  let pPrev = d[0]
    , pNext
    , i=rt;
  for (; i<max; i++){
    pNext = d[i];
    _d.push([
      getX(pNext),
      calc(getY(pPrev), getY(pNext))
    ])
    pPrev = d[i-prevStep]
  }
  return _d;
}


const fIndicatorCalc = (calc) => (d, rt=1) => {
  const _rt = parseInt(rt, 10);
  if (!(isNotEmptyArr(d)
        && isNumber(_rt)
        && _rt > 0
        && d.length > _rt )) {
    return [];
  }

  return _crIndicatorData(d, _rt, calc);
};

export default fIndicatorCalc
