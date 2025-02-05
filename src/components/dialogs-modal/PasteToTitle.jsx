import DivEllipsis from '../zhn/DivEllipsis';
import { SpanBoldBlack } from '../zhn/SpanToken';

const S_TITLE = {
  paddingBottom: 4,
  margin: '10px 6px 8px 8px',
  borderBottom: '2px solid black'
}, S_CHART_ID = {
  display: 'inline-block',
  color: '#a487d4',
  width: 240,
  verticalAlign: 'bottom',
  fontWeight: 'bold'
};

const PasteToTitle = ({
  text
}) => (
  <div style={S_TITLE}>
    <SpanBoldBlack>From Chart:&nbsp;</SpanBoldBlack>
    <DivEllipsis
       style={S_CHART_ID}
       text={text}
    />
  </div>
);

export default PasteToTitle
