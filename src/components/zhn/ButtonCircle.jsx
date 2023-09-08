//import PropTypes from "prop-types";
import {
  crBtCircleHfCn,
  crBtCircleCn
} from '../styleFn';
import Button from './Button';

const CL_BT_CIRCLE = crBtCircleCn(
  crBtCircleHfCn("bt-c1")
);

const ButtonCircle = ({
  className=CL_BT_CIRCLE,
  style,
  caption,
  title,
  onClick
}) => (
  <Button
    className={className}
    style={style}
    title={title}
    onClick={onClick}
  >{caption}
  </Button>
);


/*
ButtonCircle.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  caption: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
}
*/

export default ButtonCircle
