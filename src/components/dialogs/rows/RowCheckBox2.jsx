//import PropTypes from "prop-types";
import {
  useState,
  useMemo
} from '../../uiApi';

import RowCheckBoxView from './RowCheckBoxView';

const RowCheckBox2 = (props) => {
  const {
    onToggle,
    id
  } = props
  , [
    _value,
    _setValue
  ] = useState(
    ()=>!!props.initialValue
  )
  , [
    _hCheck,
    _hUnCheck
  ] = useMemo(() => [
    () => {
      onToggle(id, true)
      _setValue(true)
    },
    () => {
      onToggle(id, false)
      _setValue(false)
    }
  ], [onToggle, id]);

  return (
     <RowCheckBoxView
       style={props.style}
       caption={props.caption}
       captionStyle={props.captionStyle}
       checkedColor={props.checkedColor}
       value={_value}
       hCheck={_hCheck}
       hUnCheck={_hUnCheck}
     />
  );
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  checkedColor: PropTypes.string,
  initialValue: PropTypes.bool,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  onToggle: PropTypes.func
  id: PropTypes.string
}
*/

export default RowCheckBox2
