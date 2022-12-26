//import PropTypes from "prop-types";
import Button from './Button';
const CL_BT_CIRCLE = 'bt-circle bt-c1 not-selected';

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
  ><div>{caption}</div>
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
