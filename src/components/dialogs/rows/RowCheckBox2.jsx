//import PropTypes from "prop-types";
import {
  useState,
  useMemo
} from '../../uiApi';

import RowCheckBoxView from './RowCheckBoxView';

const RowCheckBox2 = ({
  initialValue,
  onToggle,
  id,
  ...restProps
}) => {
  const [
    _value,
    _setValue
  ] = useState(
    ()=>!!initialValue
  )
  , [
    _hCheck,
    _hUnCheck
  ] = useMemo(() => [
    () => {
      onToggle(true, id)
      _setValue(true)
    },
    () => {
      onToggle(false, id)
      _setValue(false)
    }
  ], [onToggle, id]);

  return (
     <RowCheckBoxView
       {...restProps}
       value={_value}
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
  onToggle: PropTypes.func
  id: PropTypes.string
}
*/

export default RowCheckBox2
