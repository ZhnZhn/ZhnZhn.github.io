//import PropTypes from "prop-types";
import { useMemo } from '../../uiApi';
import RowCheckBox1 from './RowCheckBox1';

const RowCheckBox2 = ({
  onToggle,
  id,
  ...restProps
}) => {
  const [
    onCheck,
    onUnCheck
  ] = useMemo(() => [
    () => onToggle(true, id),
    () => onToggle(false, id)
  ], [onToggle, id]);

  return (
    <RowCheckBox1
       {...restProps}
       onCheck={onCheck}
       onUnCheck={onUnCheck}
    />
  );
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  color: PropTypes.string,

  initialValue: PropTypes.bool,
  onToggle: PropTypes.func
  id: PropTypes.string
}
*/

export default RowCheckBox2
