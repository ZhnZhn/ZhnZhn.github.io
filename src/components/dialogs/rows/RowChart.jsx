import RowOcSelect from './RowOcSelect'
import SeriaColor from '../SeriaColor'

const RowChart = ({
  refSeriaColor,
  chartType,
  isShowLabels,
  labelStyle,
  placeholder,
  selectWidth,
  options,
  onSelectChart
}) => (
  <RowOcSelect
    isShowLabels={isShowLabels}
    labelStyle={labelStyle}
    caption="Chart"
    placeholder={placeholder || options[0].caption}
    width={selectWidth}
    options={options}
    onSelect={onSelectChart}
  >
    <SeriaColor
      ref={refSeriaColor}
      isLong={isShowLabels}
      chartType={chartType}
    />
  </RowOcSelect>
);

export default RowChart
