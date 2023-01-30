import pipe from '../utils/pipe';
import { valueMoving } from '../adapters/AdapterFn';
import {
  crSplineSeriaConfig,
  crArea2Config,
  fAddSeries,
  fAddMinMax,
  fAdd,
  toConfig
} from './configBuilderFn';

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
    subtitle
  } = option;
  return pipe(
    crArea2Config(title, subtitle),
    fAddSeries(crSplineSeriaConfig({
      seriaType,
      seriaColor,
      seriaWidth,
      data
    })),
    fAddMinMax(data, option),
    fAdd({ valueMoving: valueMoving(data) }),
    fAdd(confOption),
    toConfig
  );
}

export default crConfigType1
