import FlatButton from '../zhn-m/FlatButton';

const S_PERIOD_BTS = {
  paddingTop: 8,
  paddingLeft: 8
},
S_BT = {
  color: '#1b2836'
};

const ZoomDailyRow = ({
  onZoom1M,
  onZoom3M,
  onZoom6M,
  onZoomYTD,
  onZoom1Y
}) => (
<div style={S_PERIOD_BTS}>
    <FlatButton
       style={S_BT}
       caption="1M"
       onClick={onZoom1M}
    />
    <FlatButton
       style={S_BT}
       caption="3M"
       onClick={onZoom3M}
    />
    <FlatButton
       style={S_BT}
       caption="6M"
       onClick={onZoom6M}
    />
    <FlatButton
       style={S_BT}
       caption="YTD"
       onClick={onZoomYTD}
    />
    <FlatButton
       style={S_BT}
       caption="1Y"
       onClick={onZoom1Y}
    />
  </div>
);

export default ZoomDailyRow
