import React from 'react'

import RowOcSelect from './RowOcSelect'
import SeriaColor from '../SeriaColor'

const RowChart = ({
  chartType,
  isShowLabels,
  placeholder,
  options,
  onSelectChart,
  onRegColor
}) => (
  <RowOcSelect
    isShowLabels={isShowLabels}
    caption="Chart"
    placeholder={placeholder || options[0].caption}
    options={options}
    onSelect={onSelectChart}
  >
    <SeriaColor
      chartType={chartType}
      isLong={isShowLabels}
      onReg={onRegColor}
    />
  </RowOcSelect>
);

export default RowChart
