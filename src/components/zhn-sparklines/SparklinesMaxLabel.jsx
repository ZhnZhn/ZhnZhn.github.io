import max from './dataProcessing/max'
import SparklinesLabel from './SparklinesLabel'

const SparklinesMaxLabel = ({
  data,
  dy=4,
  color="#8bc34a",
  fontSize=14
}) => {
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
