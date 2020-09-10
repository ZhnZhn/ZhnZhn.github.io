import AdapterFn from '../adapters/AdapterFn'
import Builder from './ConfigBuilder'

const { valueMoving } = AdapterFn

const crConfigType1 = ({
  option,
  data,
  confOption
}) => {
  const {
    seriaType,
    seriaColor,
    seriaWidth,
    title, subtitle
  } = option
  , seria = Builder()
      .splineSeria({
         seriaType,
         seriaColor,
         seriaWidth,
         data
      })
      .toSeria();
  return Builder()
    .area2Config(title, subtitle)
    .addSeries(seria)
    .addMinMax(data, option)
    .add({valueMoving: valueMoving(data)})
    .add(confOption)
    .toConfig();
}

crConfigType1.Builder = Builder

export default crConfigType1
