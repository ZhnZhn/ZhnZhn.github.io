import BtSvgCircle from './BtSvgCircle';

const SvgPlus = ({
  style,
  onClick
}) => (
  <BtSvgCircle
    style={style}
    onClick={onClick}
  >
    <path d="M 10,4 L 10,16 M 4,10 L 16,10" />
  </BtSvgCircle>
);

export default SvgPlus
