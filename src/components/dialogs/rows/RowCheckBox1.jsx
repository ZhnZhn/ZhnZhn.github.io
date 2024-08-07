//import PropTypes from "prop-types";
import { useCallback } from '../../uiApi';
import { useBool } from '../../hooks/useBool';

import RowCheckBoxView from './RowCheckBoxView';

const DF_FN = () => {};

const RowCheckBox1 = ({
  initialValue,
  onCheck=DF_FN,
  onUnCheck=DF_FN,
  ...restProps
}) => {
  const [
    value,
    setTrue,
    setFalse
  ] = useBool(initialValue)
  , _hCheck = useCallback(() => {
      onCheck()
      setTrue()
   }, [onCheck, setTrue])
  , _hUnCheck = useCallback(() => {
      onUnCheck()
      setFalse()
  }, [onUnCheck, setFalse]);

  return (
    <RowCheckBoxView
      {...restProps}
      value={value}
      hCheck={_hCheck}
      hUnCheck={_hUnCheck}
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
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func
}
*/

export default RowCheckBox1
