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
  chartDefault,
  onSelectChart,
  isShowDate,
  noDate=false,
  dateDefault,
  dateOptions,
  onSelectDate,
  isDim,
  dimOptions,
  onSelectDim
}) => (
  <>
    <ShowHide isShow={isShowChart}>
      <RowChart
        refSeriaColor={refSeriaColor}
        chartType={chartType}
        isShowLabels={isShowLabels}
        labelStyle={labelStyle}
        placeholder={chartDefault}
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
           onSelect={onSelectDim}
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
           onSelect={onSelectDate}
        />
      </ShowHide>
    }
  </>
);

export default RowChartDate
