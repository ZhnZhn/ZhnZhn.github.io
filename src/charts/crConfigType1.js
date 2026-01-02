import {
  isArr,
  isNumber
} from '../utils/isTypeFn';
import pipe from '../utils/pipe';

import {
  roundBy
} from '../math/mathFn';
import {
  crSplineConfig,
  fAddMinMax,
  fAdd,
  toConfig
} from './configBuilderFn';

const ifCaseRoundBy = (
  rt,
  data
) => {
  if (isNumber(rt) && isArr(data[0])) {
    data.forEach(p => {
       p[1] = roundBy(p[1], rt)
    })
  }
}

const crConfigType1 = ({
  option,
  data,
  confOption
}) => {
  const {
    _rt
  } = option;

  ifCaseRoundBy(_rt, data)

  return pipe(
    crSplineConfig(data, option),
    fAddMinMax(data, option),
    fAdd(confOption),
    toConfig
  );
}

export default crConfigType1
