import BtSvgX from './BtSvgX';

const CL = "bt-svg-clear";

const SvgClear = ({ 
  style,
  onClick
}) => (
  <BtSvgX
    className={CL}
    style={style}
    onClick={onClick}
  />
);

export default SvgClear
