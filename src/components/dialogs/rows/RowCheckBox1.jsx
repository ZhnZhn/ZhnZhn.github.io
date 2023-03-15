//import PropTypes from "prop-types";
import {
  useState,
  useCallback
} from '../../uiApi';

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
    setValue
  ] = useState(
    ()=>!!initialValue
  )
  , _hCheck = useCallback(()=> {
      onCheck()
      setValue(true)
   }, [onCheck])
  , _hUnCheck = useCallback(() => {
      onUnCheck()
      setValue(false)
  }, [onUnCheck]);

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
