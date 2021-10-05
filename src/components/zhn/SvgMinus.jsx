import BtSvgCircle from './BtSvgCircle';

const SvgMinus = ({
  style,
  onClick
}) => (
  <BtSvgCircle
    style={style}
    onClick={onClick}
  >
    <path d="M 4,10 L 16,10" />
  </BtSvgCircle>
);

export default SvgMinus
