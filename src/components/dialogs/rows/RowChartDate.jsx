import ShowHide from '../../zhn/ShowHide';
import RowChart from './RowChart';
import RowInputSelect from './RowInputSelect';

const RowChartDate = ({
  refSeriaColor,
  chartType,
  isShowLabels,
  labelStyle,
  selectWidth,
  isShowChart,
  chartOptions,
  onSelectChart,
  isShowDate,
  noDate=false,
  dateDefault,
  dateOptions,
  onSelecDate,
  isDim,
  dimOptions,
  onSelecDim
}) => (
  <>
    <ShowHide isShow={isShowChart}>
      <RowChart
        refSeriaColor={refSeriaColor}
        chartType={chartType}
        isShowLabels={isShowLabels}
        labelStyle={labelStyle}
        selectWidth={selectWidth}
        options={chartOptions}
        onSelectChart={onSelectChart}
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
