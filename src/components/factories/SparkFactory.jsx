import React from 'react';

import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
  SparklinesSpot,
  SparklinesReferenceLine,
  SparklinesBars
} from '../zhn-sparklines/Sparklines';


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
          <SparklinesLine color="yellow" />
          <SparklinesReferenceLine
               style={ {stroke: 'red', strokeOpacity: .75, strokeDasharray: '5, 3'} }
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
            style={{ stroke: "black", strokeWidth: "1", fill: "yellow", fillOpacity: "0.9" }}
            pointIndex={pointIndex}
         />
      </Sparklines>
    )
  }
}

export default SparkFactory
