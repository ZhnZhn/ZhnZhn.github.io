import C from '../styles/Color';

import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
  SparklinesSpot,
  SparklinesReferenceLine,
  SparklinesBars
} from '../zhn-sparklines/Sparklines';

const C_YELLOW = C.YELLOW;

const S = {
  REF_LINE: {
    stroke: 'red',
    strokeOpacity: .75,
    strokeDasharray: '5, 3'
  },
  BARS: {
    stroke: "black",
    strokeWidth: "1",
    fill: C_YELLOW,
    fillOpacity: "0.9"
  }
};

const SparkFactory = {
  createSparklines(data, pointIndex){
     return (
       <Sparklines
          height={45}
          width={100}
          svgHeight={45}
          svgWidth={100}
          data={data}
       >
          <SparklinesLine color={C_YELLOW} />
          <SparklinesReferenceLine
             style={S.REF_LINE}
             type="avg"
          />
          <SparklinesSpots />
          <SparklinesSpot pointIndex={pointIndex} />
       </Sparklines>
     )
  },
  createSparkbars(data, pointIndex){
    return (
      <Sparklines
         height={45}
         width={100}
         svgHeight={45}
         svgWidth={100}
         data={data}
         min={0}
         max={100}
      >
         <SparklinesBars
            style={S.BARS}
            pointIndex={pointIndex}
         />
      </Sparklines>
    )
  }
}

export default SparkFactory
