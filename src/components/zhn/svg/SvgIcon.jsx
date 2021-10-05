import Svg from './Svg';

const SvgIcon = ({
  style,
  color='currentColor',
  size='24',
  children
}) => (
    <Svg
      w={size}
      style={style}
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
);

export default SvgIcon
