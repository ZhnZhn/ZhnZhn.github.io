import React from 'react'

import D from '../dialogs/DialogCell'

const RowChart = ({
  chartType,
  isShowLabels,
  isShowChart, chartOptions,
  onSelectChart, onRegColor,
  isShowDate, noDate=false,
  dateDefault, dateOptions, onSelecDate
}) => (
  <>
    <D.ShowHide isShow={isShowChart}>
      <D.RowChart
        chartType={chartType}
        isShowLabels={isShowLabels}
        options={chartOptions}
        onSelectChart={onSelectChart}
        onRegColor={onRegColor}
      />
    </D.ShowHide>
    {
      !noDate &&
      <D.ShowHide isShow={isShowDate}>
        <D.RowInputSelect
           isShowLabels={isShowLabels}
           caption="For Date"
           placeholder={dateDefault}
           options={dateOptions}
           onSelect={onSelecDate}
        />
      </D.ShowHide>
    }
  </>
);

export default RowChart
