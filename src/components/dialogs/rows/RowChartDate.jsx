import React from 'react'

import Comp from '../../Comp'
import RowChart from './RowChart'
import RowInputSelect from './RowInputSelect'

const { ShowHide } = Comp

const RowChartDate = ({
  chartType,
  isShowLabels,
  isShowChart, chartOptions,
  onSelectChart, onRegColor,
  isShowDate, noDate=false,
  dateDefault, dateOptions, onSelecDate
}) => (
  <>
    <ShowHide isShow={isShowChart}>
      <RowChart
        chartType={chartType}
        isShowLabels={isShowLabels}
        options={chartOptions}
        onSelectChart={onSelectChart}
        onRegColor={onRegColor}
      />
    </ShowHide>
    {
      !noDate &&
      <ShowHide isShow={isShowDate}>
        <RowInputSelect
           isShowLabels={isShowLabels}
           caption="For Date"
           placeholder={dateDefault}
           options={dateOptions}
           onSelect={onSelecDate}
        />
      </ShowHide>
    }
  </>
);

export default RowChartDate
