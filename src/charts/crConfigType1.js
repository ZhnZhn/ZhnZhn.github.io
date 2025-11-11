import pipe from '../utils/pipe';

import {
  isArr,
  isNumber,
  roundBy
} from '../adapters/AdapterFn';
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
