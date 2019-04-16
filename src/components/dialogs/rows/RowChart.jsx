import React from 'react'

import RowOcSelect from './RowOcSelect'
import SeriaColor from '../SeriaColor'

const RowChart = ({
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
      isLong={isShowLabels}
      onReg={onRegColor}
    />
  </RowOcSelect>
);

export default RowChart
