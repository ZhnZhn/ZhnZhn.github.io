import {
  EVENODD_PROPS,
  Svg
} from '../zhn/svg/Svg';

const _crRect = (
  rx,
  y, x,
  height, width,
  color
) => (
  <rect
    ry="2"
    rx={rx}
    y={y}
    x={x}
    height={height}
    width={width}
    fill={color}
    stroke={color}
  />
);

const IconLogoErc = (props) => (
  <span
    className={props.className}
    title={props.title}
  >
    <Svg
      {...EVENODD_PROPS}
      w="32"
      strokeWidth="2"
    >
      {_crRect(194, 1.5, 19, 12.5, 11, "#8ecc2d")}
      {_crRect(204.5, 17.5, 9, 13.5, 18, "#232f3b")}
      {_crRect(204.5, 3.5, 2.5, 11, 10, "#a487d4")}
    </Svg>
  </span>
);

export default IconLogoErc
