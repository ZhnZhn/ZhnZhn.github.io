import pipe from '../utils/pipe';
import { valueMoving } from '../adapters/AdapterFn';
import Builder from './ConfigBuilder';
import {
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
  } = option
  , seria = Builder()
      .splineSeria({
         seriaType,
         seriaColor,
         seriaWidth,
         data
      })
      .toSeria();
  return pipe(
    crArea2Config(title, subtitle),
    fAddSeries(seria),
    fAddMinMax(data, option),
    fAdd({ valueMoving: valueMoving(data) }),
    fAdd(confOption),
    toConfig
  );
}

export default crConfigType1
