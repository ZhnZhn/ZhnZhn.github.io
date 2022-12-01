import {
  YELLOW_COLOR
} from '../styles/Color';

import SparklinesLazy from '../zhn-lazy/SparklinesLazy';

const {
  SparkView,
  Line,
  Spots,
  Spot,
  ReferenceLine,
  Bars
} = SparklinesLazy;

const S_REF_LINE = {
  stroke: 'red',
  strokeOpacity: .75,
  strokeDasharray: '5, 3'
},
S_BARS = {
  stroke: "black",
  strokeWidth: "1",
  fill: YELLOW_COLOR,
  fillOpacity: "0.9"
};

export const crSparkLines = (
  data,
  pointIndex
) => (
   <SparkView
     height={45}
     width={100}
     svgHeight={45}
     svgWidth={100}
     data={data}
   >
     <Line color={YELLOW_COLOR} />
     <ReferenceLine
        style={S_REF_LINE}
        type="avg"
     />
     <Spots />
     <Spot pointIndex={pointIndex} />
   </SparkView>
);


export const crSparkBars = (
  data,
  pointIndex
) => (
   <SparkView
      height={45}
      width={100}
      svgHeight={45}
      svgWidth={100}
      data={data}
      min={0}
      max={100}
   >
      <Bars
         style={S_BARS}
         pointIndex={pointIndex}
      />
   </SparkView>
);
