
import pipe from '../utils/pipe';
import {
  isArr,
  isNumber,
  roundBy,
  valueMoving
} from '../adapters/AdapterFn';
import {
  crSplineSeriaConfig,
  crArea2Config,
  fAddSeries,
  fAddMinMax,
  fAdd,
  toConfig
} from './configBuilderFn';

const ifCaseRoundByData = (
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
    seriaType,
    seriaColor,
    seriaWidth,
    title,
    subtitle,
    _rt
  } = option;

  ifCaseRoundByData(_rt, data)

  return pipe(
    crArea2Config(title, subtitle),
    fAddSeries(crSplineSeriaConfig({
      seriaType,
      seriaColor,
      seriaWidth,
      data
    })),
    fAddMinMax(data, option),
    fAdd({ valueMoving: valueMoving(data, _rt) }),
    fAdd(confOption),
    toConfig
  );
}

export default crConfigType1
