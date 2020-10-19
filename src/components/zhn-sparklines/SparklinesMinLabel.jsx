import min from './dataProcessing/min'
import SparklinesLabel from './SparklinesLabel'

const DF_COLOR = "#f44336"
const DF_FONT_SIZE = 14
const DF_DY = 3

const SparklinesMinLabel = (props) => {
  const { data, height=0, dy=DF_DY, color=DF_COLOR, fontSize=DF_FONT_SIZE } = props
  const _min = min(data)
      , _y = height - dy;
  return (
    <SparklinesLabel
       title={_min}
       x={0} y={_y}
       stroke="none" fill={color} fontSize={fontSize}
    />
  );
};

export default SparklinesMinLabel
