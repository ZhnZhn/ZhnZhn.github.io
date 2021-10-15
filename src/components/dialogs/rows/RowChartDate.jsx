import Comp from '../../Comp'
import RowChart from './RowChart'
import RowInputSelect from './RowInputSelect'

const { ShowHide } = Comp

const RowChartDate = ({
  chartType,
  isShowLabels,
  labelStyle,
  selectWidth,
  isShowChart, chartOptions,
  onSelectChart, onRegColor,
  isShowDate, noDate=false,
  dateDefault, dateOptions, onSelecDate,
  isDim, dimOptions, onSelecDim
}) => (
  <>
    <ShowHide isShow={isShowChart}>
      <RowChart
        chartType={chartType}
        isShowLabels={isShowLabels}
        labelStyle={labelStyle}
        selectWidth={selectWidth}
        options={chartOptions}
        onSelectChart={onSelectChart}
        onRegColor={onRegColor}
      />
    </ShowHide>
    {
      isDim && dimOptions &&
      <ShowHide isShow={isShowDate}>
        <RowInputSelect
           isShowLabels={isShowLabels}
           caption="Dim"           
           options={dimOptions}
           onSelect={onSelecDim}
        />
      </ShowHide>
    }
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
