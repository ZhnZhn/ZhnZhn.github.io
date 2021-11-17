import min from './dataProcessing/min'
import Label from './Label'

const MinLabel = ({
  data,
  height=0,
  dy=3,
  color="#f44336",
  fontSize=14
}) => {
  const _min = min(data)
  , _y = height - dy;
  return (
    <Label
       title={_min}
       x={0} y={_y}
       stroke="none" fill={color} fontSize={fontSize}
    />
  );
};

export default MinLabel
