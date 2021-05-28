//import PropTypes from "prop-types";

const CL_BT_CIRCLE = 'zhn-bt-circle';

const ButtonCircle = ({
  className=CL_BT_CIRCLE,
  style,
  caption,
  title,
  onClick
}) => (
  <button
    className={className}
    style={style}
    title={title}
    onClick={onClick}
  >
   {caption}
  </button>
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
