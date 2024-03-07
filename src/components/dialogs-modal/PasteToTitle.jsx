import DivEllipsis from '../zhn/DivEllipsis';
import { SpanBlack } from '../zhn/SpanToken';

const S_TITLE = {
  paddingBottom: 4,
  margin: '0 0 8px 16px',
  fontWeight: 'bold',
  borderBottom: '2px solid black'
}, S_CHART_ID = {
  display: 'inline-block',
  color: '#a487d4',
  width: 200,
  verticalAlign: 'bottom'
};

const PasteToTitle = ({
  chartId
}) => (
  <div style={S_TITLE}>
    <SpanBlack>From Chart:&nbsp;</SpanBlack>
    <DivEllipsis
       style={S_CHART_ID}
       text={chartId}
    />
  </div>
);

export default PasteToTitle
