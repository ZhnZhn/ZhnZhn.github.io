//import PropTypes from "prop-types";
import SvgX from './svg/SvgX'

const CL = "bt-svg-close";

const SvgClose = ({ style, onClose }) => (
   <button
      tabIndex="-1"
      className={CL}
      style={style}
      onClick={onClose}
   >
     <SvgX />
   </button>
)

/*
SvgClose.propTypes = {
  style: PropTypes.object,
  onClose: PropTypes.func
}
*/

export default SvgClose
