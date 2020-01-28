import React from 'react'

import D from './DialogCell';

const S = {
  PERIOD_BTS: {
    paddingTop: 8,
    paddingLeft: 8
  },
  BT: {
    color: '#1b2836'
  }
};

const ZoomDailyRow = ({
  onZoom1M,
  onZoom3M,
  onZoom6M,
  onZoomYTD,
  onZoom1Y
}) => (
<div style={S.PERIOD_BTS}>
    <D.Button.Flat
       rootStyle={S.BT}
       key="1M"
       caption="1M"
       onClick={onZoom1M}
    />
    <D.Button.Flat
       rootStyle={S.BT}
       key="3M"
       caption="3M"
       onClick={onZoom3M}
    />
    <D.Button.Flat
       rootStyle={S.BT}
       key="6M"
       caption="6M"
       onClick={onZoom6M}
    />
    <D.Button.Flat
       rootStyle={S.BT}
       key="YTD"
       caption="YTD"
       onClick={onZoomYTD}
    />
    <D.Button.Flat
       rootStyle={S.BT}
       key="1Y"
       caption="1Y"
       onClick={onZoom1Y}
    />
  </div>
);

export default ZoomDailyRow
