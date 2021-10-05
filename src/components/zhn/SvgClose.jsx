import BtSvgX from './BtSvgX';

const CL = "bt-svg-close";

const SvgClose = ({
  style,
  onClose
}) => (
  <BtSvgX
    className={CL}
    style={style}
    onClick={onClose}
  />
);

export default SvgClose
