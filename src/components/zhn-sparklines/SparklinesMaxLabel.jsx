import max from './dataProcessing/max'
import SparklinesLabel from './SparklinesLabel'

const DF_COLOR = "#8bc34a"
const DF_FONT_SIZE = 14
const DF_DY = 4
//const DF_OPACITY = 0.7

const SparklinesMaxLabel = (props) => {
  const { data, dy=DF_DY, color=DF_COLOR, fontSize=DF_FONT_SIZE } = props
  const _max = max(data)
      , _y = fontSize - dy;
  return (
    <SparklinesLabel
       title={_max}
       x={0} y={_y}
       stroke="none" fill={color} fontSize={fontSize}
    />
  );
};

export default SparklinesMaxLabel
