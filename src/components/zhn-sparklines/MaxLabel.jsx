import max from './dataProcessing/max'
import Label from './Label'

const MaxLabel = ({
  data,
  dy=4,
  color="#8bc34a",
  fontSize=14
}) => {
  const _max = max(data)
  , _y = fontSize - dy;
  return (
    <Label
       title={_max}
       x={0} y={_y}
       stroke="none" fill={color} fontSize={fontSize}
    />
  );
};

export default MaxLabel
