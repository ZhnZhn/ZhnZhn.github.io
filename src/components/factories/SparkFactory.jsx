import C from '../styles/Color';

import Sparklines from '../zhn-sparklines/Sparklines';

const {
  SparkView,
  Line,
  Spots,
  Spot,
  ReferenceLine,
  Bars
} = Sparklines

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
       <SparkView
          height={45}
          width={100}
          svgHeight={45}
          svgWidth={100}
          data={data}
       >
          <Line color={C_YELLOW} />
          <ReferenceLine
             style={S.REF_LINE}
             type="avg"
          />
          <Spots />
          <Spot pointIndex={pointIndex} />
       </SparkView>
     );
  },
  createSparkbars(data, pointIndex){
    return (
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
            style={S.BARS}
            pointIndex={pointIndex}
         />
      </SparkView>
    );
  }
};

export default SparkFactory
