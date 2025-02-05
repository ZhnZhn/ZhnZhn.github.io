import DivEllipsis from '../zhn/DivEllipsis';
import { SpanBoldBlack } from '../zhn/SpanToken';

const S_TITLE = {
  paddingBottom: 4,
  margin: '0 0 8px 16px',
  borderBottom: '2px solid black'
}, S_CHART_ID = {
  display: 'inline-block',
  color: '#a487d4',
  width: 200,
  verticalAlign: 'bottom',
  fontWeight: 'bold'
};

const PasteToTitle = ({
  chartId
}) => (
  <div style={S_TITLE}>
    <SpanBoldBlack>From Chart:&nbsp;</SpanBoldBlack>
    <DivEllipsis
       style={S_CHART_ID}
       text={chartId}
    />
  </div>
);

export default PasteToTitle
