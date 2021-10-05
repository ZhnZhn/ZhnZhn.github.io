
const Svg = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${w}px`}
    height={`${h}px`}
    viewBox={`0 0 ${w} ${h}`}
    {...restProps}
  >
    {children}
  </svg>
);

export default Svg
