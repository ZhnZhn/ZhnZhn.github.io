import {
  isNumber,
  parseIntBy10
} from '../utils/isTypeFn';

import { crPointGetter } from './seriaHelperFn';

const _crIndicatorData = (
  d,
  rt,
  calc,
  getX,
  getY
) => {
  const _d = []
  , max = d.length
  , prevStep = rt-1;
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
  const [getX, getY] = crPointGetter(d)
  , _rt = parseIntBy10(rt);
  if (!(getX
        && isNumber(_rt)
        && _rt > 0
        && d.length > _rt )) {
    return [];
  }

  return _crIndicatorData(d, _rt, calc, getX, getY);
};

export default fIndicatorCalc
