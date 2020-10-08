import React from 'react'

import RowOcSelect from './RowOcSelect'
import SeriaColor from '../SeriaColor'

const RowChart = ({
  chartType,
  isShowLabels,
  labelStyle,
  placeholder,
  selectWidth,
  options,
  onSelectChart,
  onRegColor
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
      chartType={chartType}
      isLong={isShowLabels}
      onReg={onRegColor}
    />
  </RowOcSelect>
);

export default RowChart
