//import PropTypes from "prop-types";
import InputSwitch from '../../zhn/InputSwitch';

const DF_ON_TOGGLE = () => {};

const RowCheckBox3 = ({
  value,
  style,
  caption,
  onToggle=DF_ON_TOGGLE
}) => (
  <InputSwitch
    initialValue={!!value}
    caption={caption}
    style={style}
    initialValue={!!value}
    onCheck={() => onToggle(!0)}
    onUnCheck={() => onToggle(!1)}
  />
);

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  color: PropTypes.string,
  value: PropTypes.bool,

  onToggle: PropTypes.func
}
*/

export default RowCheckBox3
